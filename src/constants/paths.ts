// Роуты для страниц
interface IPaths {
  root: string;
  table: string;
  error: string;
  addUser: string;
  deleteUser: string;
  editUser: string;
}
export const PATHS: IPaths = {
  root: '/',
  table: '/table',
  error: '/error',
  addUser: '/table/add/user',
  editUser: '/table/edit/user',
  deleteUser: '/table/delete/user',
}