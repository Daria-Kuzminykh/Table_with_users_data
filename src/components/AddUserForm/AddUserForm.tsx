import React, {ChangeEvent, FC, FormEvent} from 'react';
import styles from './adduserform.module.scss';
import AddButton from "../AddButton";
import {IRole} from "../../store/rolesAction";
import Message from "../Message";
import Loading from "../Loading";

interface IAddUserForm {
  handlerSubmit: (event: FormEvent) => void;
  handlerChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  form: IFormValues | any;
  roles: Array<IRole>;
  loading?: boolean;
  error?: string;
  message?: string;
}

export interface IFormValues {
  surname: string;
  name: string;
  middleName: string;
  birthday: string;
  birthPlace: string;
  email: string;
  role: string;
  phoneNumber: string;
}

interface IInput {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
}

const AddUserForm: FC<IAddUserForm> = ({ handlerSubmit, handlerChange, form, roles, loading, error, message }) => {
  const inputs: Array<IInput> = [
    { name: 'name', minLength: 2, type: 'text', label: '1. Введите ваше имя', placeholder: 'Иван' },
    { name: 'surname', minLength: 2, type: 'text', label: '2. Введите вашу фамилию', placeholder: 'Иванов' },
    { name: 'middleName', minLength: 2, type: 'text', label: '3. Введите ваше отчество', placeholder: 'Иванович' },
    { name: 'birthday', type: 'date', label: '4. Введите дату рождения', placeholder: '' },
    { name: 'birthPlace', minLength: 2, type: 'text', label: '5. Укажите место рождения', placeholder: 'г. Краснодар' },
    { name: 'email', type: 'email', label: '6. Введите адрес электронной почты', placeholder: 'ivan@mail.ru' },
    { name: 'phoneNumber', maxLength: 11, minLength: 11, type: 'tel', label: '7. Введите номер телефона', placeholder: '89501234567' },
  ];

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      {loading && <Loading />}
      {inputs.map((item) => {
        return (
          <div className={styles.form__inputBox} key={item.name}>
            <label className={styles.form__label} htmlFor={item.name}>
              {item.label}
            </label>
            <input
              className={styles.form__input}
              type={item.type}
              id={item.name}
              name={item.name}
              required
              minLength={item.minLength}
              maxLength={item.maxLength}
              placeholder={item.placeholder}
              value={form[item.name]}
              onChange={handlerChange}
            />
          </div>
        )
      })}
      <div className={styles.form__inputBox}>
        <label className={styles.form__label} htmlFor="role">
          8. Выберите роль
        </label>
        <select
          className={styles.form__select}
          name="role" id="role"
          onChange={handlerChange}
          value={form.role}
          required
        >
          {roles.map((item) => {
            return (
              <option value={item.title} key={item.id}>{item.title}</option>
            )
          })}
        </select>
      </div>
      {error && <Message message={error} isError={true} />}
      {!loading && message && <Message message={message} />}
      <AddButton />
    </form>
  )
};
export default AddUserForm;
