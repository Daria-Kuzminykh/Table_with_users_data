import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import AddUserForm from "../../components/AddUserForm";
import Modal from "../../components/Modal";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRole, RolesAction} from "../../store/rolesAction";
import {PATHS, url} from "../../constants";
import {IRootState} from "../../store/rootReducer";
import {IUser, UsersAction} from "../../store/usersAction";

interface IParams {
  id: string;
}

const EditUserModal: FC = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector<IRootState, Array<IRole>>(state => state.roles);
  const users = useSelector<IRootState, Array<IUser>>(state => state.data);
  const user = users.find((item) => item.id === id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    surname: user?.surname,
    name: user?.name,
    middleName: user?.middleName,
    birthday: `${user?.birthday.substr(0, 4)}-${(user?.birthday.substr(5, 2))}-${(user?.birthday.substr(8, 2))}`,
    birthPlace: user?.birthPlace,
    email: user?.email,
    role: 'Администратор',
    phoneNumber: user?.phoneNumber,
  });

  //Изменение пользователя в базе данных
  function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const phone = user?.phoneNumber === form.phoneNumber ?
      form.phoneNumber : `+7 (${form.phoneNumber?.substr(1, 3)}) ${form.phoneNumber?.substr(4, 3)}-${form.phoneNumber?.substr(7, 2)}-${form.phoneNumber?.substr(9, 2)}`
    const role = roles.find((item) => String(item.title) === String(form.role));
    const requestBody = {
      surname: form.surname,
      name: form.name,
      middleName: form.middleName,
      birthday: new Date(Number(form.birthday?.substr(0, 4)), Number(form.birthday?.substr(5, 2)), Number(form.birthday?.substr(8, 2))),
      birthPlace: form.birthPlace,
      email: form.email,
      roleId: role?.id,
      phoneNumber: phone,
      lastUpdate: new Date(),
      registerDate: user?.registerDate,
    };

    axios.put(`${url}/api/users/${id}`, requestBody).then(() => {
      setLoading(false);
      setMessage('Пользователь изменен');
      dispatch(UsersAction([]));
      setTimeout(() => {
        history.push(PATHS.table);
      }, 700);
    }).catch((error) => {
      setError(error);
    })
  }

  function handlerChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  //Получение списка ролей с сервера
  function getRoles() {
    axios.get(`${url}/api/roles`).then((res) => {
      dispatch(RolesAction(res.data.collection));
      setLoading(false);
    }).catch(() => {
      history.push(PATHS.error);
    });
  }

  useEffect(() => {
    getRoles();
  }, [])

  return (
    <Modal
      title="Изменить данные"
      children={
        <AddUserForm
          handlerSubmit={handlerSubmit}
          handlerChange={handlerChange}
          form={form}
          roles={roles}
          loading={loading}
          error={error}
          message={message}
        />
      }
    />
  )
}

export default EditUserModal;
