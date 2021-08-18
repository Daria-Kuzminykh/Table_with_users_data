import React, {FC, useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../store/rootReducer";
import axios from "axios";
import {PATHS, url} from "../../constants";
import {IUser, UsersAction} from "../../store/usersAction";
import Loading from "../../components/Loading";
import {useHistory} from "react-router-dom";

const Table: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector<IRootState, Array<IUser>>(state => state.data);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(true);

  //Загрузка данных пользователей с сервера
  function getData() {
    if (data.length) return;
    axios.get(`${url}/api/users`).then((res) => {
      res.data.collection.map((item: IUser) => {
        item.fullName = `${item.surname} ${item.name.substr(0, 1)}. ${item.middleName.substr(0, 1)}.`;
      });
      dispatch(UsersAction(res.data.collection));
      setLoading(false);
    }).catch(() => {
      history.push(PATHS.error);
    });
  }

  function handlerEdit(id: string) {
    history.push(`${PATHS.editUser}/${id}`);
  }

  function handlerDelete(id: string) {
    history.push(`${PATHS.deleteUser}/${id}`);
  }

  function handlerAdd() {
    history.push(PATHS.addUser);
  }

  //Сортировка по любому свойству объекта пользователя
  function handlerSort(property: string) {
    const sortUp = (a: any, b: any) => a[property] > b[property] ? 1 : -1;
    const sortDown = (a: any, b: any) => a[property] < b[property] ? 1 : -1;
    const sortingData = data.sort(sort ? sortUp : sortDown);
    dispatch(UsersAction(sortingData));
    setSort((prev) => !prev);
  }

  useEffect(() => {
    getData();
  }, [data]);

  if (loading) return <Loading />

  return (
    <TableComponent
      data={data}
      handlerAdd={handlerAdd}
      handlerDelete={handlerDelete}
      handlerEdit={handlerEdit}
      handlerSort={handlerSort}
      sort={sort}
    />
  )
}
export default Table;