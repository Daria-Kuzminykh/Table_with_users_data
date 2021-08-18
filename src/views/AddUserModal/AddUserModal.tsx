import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import AddUserForm from "../../components/AddUserForm";
import Modal from "../../components/Modal";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRole, RolesAction} from "../../store/rolesAction";
import {PATHS, url} from "../../constants";
import {IRootState} from "../../store/rootReducer";
import {UsersAction} from "../../store/usersAction";

const AddUserModal: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector<IRootState, Array<IRole>>(state => state.roles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    surname: '',
    name: '',
    middleName: '',
    birthday: '',
    birthPlace: '',
    email: '',
    role: 'Администратор',
    phoneNumber: '',
  });

  //Добавление пользователя в базу данных
  function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const createDate = new Date();
    const role = roles.find((item) => item.title === form.role);
    const requestBody = {
      surname: form.surname,
      name: form.name,
      middleName: form.middleName,
      birthday: new Date(Number(form.birthday.substr(0, 4)), Number(form.birthday.substr(5, 2)), Number(form.birthday.substr(8, 2))),
      birthPlace: form.birthPlace,
      email: form.email,
      roleId: role?.id,
      phoneNumber: `+7 (${form.phoneNumber.substr(1, 3)}) ${form.phoneNumber.substr(4, 3)}-${form.phoneNumber.substr(7, 2)}-${form.phoneNumber.substr(9, 2)}`,
      lastUpdate: createDate,
      registerDate: createDate,
    };

    axios.post(`${url}/api/users`, requestBody).then(() => {
      setLoading(false);
      setMessage('Пользователь успешно создан');
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
    console.log(form);
  }, [])

  return (
    <Modal
      title="Добавить данные"
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

export default AddUserModal;
