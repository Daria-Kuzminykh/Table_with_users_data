import React, {FC, useState} from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {PATHS, url} from "../../constants";
import {UsersAction} from "../../store/usersAction";
import styles from './deleteusermodal.module.scss';
import Loading from "../../components/Loading";
import AddButton from "../../components/AddButton";
import Message from "../../components/Message";

interface IParams {
  id: string;
}

const DeleteUserModal: FC = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  //Удаление пользователя из базы данных
  function handlerClick() {
    setError('');
    setMessage('');
    setLoading(true);

    axios.delete(`${url}/api/users/${id}`,).then(() => {
      setLoading(false);
      setMessage('Пользователь удален');
      dispatch(UsersAction([]));
      setTimeout(() => {
        history.push(PATHS.table);
      }, 700);
    }).catch((error) => {
      setError(error);
    })
  }

  return (
    <Modal
      title="Добавить данные"
      children={
        <>
          {loading && <Loading />}
          <p className={styles.text}>Вы уверены, что хотите удалить пользователя?</p>
          {message && <Message message={message} />}
          {error && <Message message={error} isError={true} /> }
          <AddButton text="Удалить" handlerClick={handlerClick} />
        </>
      }
    />
  )
}
export default DeleteUserModal;
