import React, {FC} from 'react';
import styles from './tablecomponent.module.scss';
import SimpleBar from "simplebar-react";
import {IUser} from "../../store/usersAction";
import classNames from "classnames";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import AddIcon from "../icons/AddIcon";

interface ITableComponent {
  data: Array<IUser>;
  handlerEdit: (id: string) => void;
  handlerDelete: (id: string) => void;
  handlerAdd: VoidFunction;
  handlerSort: (property: string) => void;
  sort?: boolean;
}

const TableComponent: FC<ITableComponent> = ({ data, handlerDelete, handlerEdit, handlerAdd, handlerSort, sort }) => {
  return (
    <div className="container">
      <h2 className={styles.title}>Таблица пользователей</h2>
      <SimpleBar className={styles.simplebar}>
        <table className={styles.table}>
          <thead className={styles.table__header}>
            <tr className={styles.table__headerTr}>
              <td className={classNames(styles.table__headerTd, styles.table__headerTd_name)} onClick={() => handlerSort('fullName')}>ФИО</td>
              <td className={styles.table__headerTd}>Роль</td>
              <td className={styles.table__headerTd}>Дата рождения</td>
              <td className={styles.table__headerTd}>Место рождения</td>
              <td className={styles.table__headerTd}>Почта</td>
              <td className={styles.table__headerTd}>Номер телефона</td>
              <td className={styles.table__headerTd}>Дата регистрации</td>
              <td className={styles.table__headerTd}>Последнее изменение</td>
              <td className={classNames(styles.table__headerTd, styles.table__headerTd_actions)}>
                <button className={styles.table__addBtn} onClick={handlerAdd}>
                  <AddIcon />
                  Добавить
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
          {(sort || !sort) && data.map((item) => {
            const birthDate = `${item.birthday.substr(8, 2)}.${item.birthday.substr(5, 2)}.${item.birthday.substr(0, 4)}`;
            const createDate = `${item.registerDate.substr(8, 2)}.${item.registerDate.substr(5, 2)}.${item.registerDate.substr(0, 4)}`;
            const update = `${item.lastUpdate.substr(8, 2)}.${item.lastUpdate.substr(5, 2)}.${item.lastUpdate.substr(0, 4)}`;

            return (
              <tr className={styles.table__tr} key={item.id}>
                <td className={styles.table__td}>{item.fullName}</td>
                <td className={styles.table__td}>{item.role.title}</td>
                <td className={styles.table__td}>{birthDate}</td>
                <td className={styles.table__td}>{item.birthPlace}</td>
                <td className={styles.table__td}>{item.email}</td>
                <td className={styles.table__td}>{item.phoneNumber}</td>
                <td className={styles.table__td}>{createDate}</td>
                <td className={styles.table__td}>{update}</td>
                <td className={styles.table__td}>
                  <button className={styles.table__editBtn} onClick={() => handlerEdit(item.id)}>
                    <EditIcon />
                  </button>
                  <button className={styles.table__deleteBtn} onClick={() => handlerDelete(item.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </SimpleBar>
    </div>
  )
};
export default TableComponent;
