import React, {FC} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {PATHS} from "../constants/paths";
import Table from "../views/Table";
import Error from "../components/Error";
import AddUserModal from "../views/AddUserModal";
import DeleteUserModal from "../views/DeleteUserModal";
import EditUserModal from "../views/EditUserModal";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PATHS.table}>
          <Table />
          <Route path={PATHS.addUser}>
            <AddUserModal />
          </Route>
          <Route path={`${PATHS.deleteUser}/:id`}>
            <DeleteUserModal />
          </Route>
          <Route path={`${PATHS.editUser}/:id`}>
            <EditUserModal />
          </Route>
        </Route>
        <Route path={PATHS.error}>
          <Error />
        </Route>
        <Route path={PATHS.root}>
          <div>Hello!</div>
        </Route>

        <Redirect to={PATHS.root} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
