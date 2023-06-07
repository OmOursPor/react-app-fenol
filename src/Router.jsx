import React from 'react';
import './index.css';
import App from './App';
import UserList from './pages/UserList';
import User from './pages/User';
import Header from './components/Header';

import {
  Route,
  Routes
} from "react-router-dom"

import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import Groupe from './pages/Groupe'
import protectedRoutes from './Middleware/ProtectedRoutes';
import Profile from './pages/Profile';

const Router = () => {

    try {
      let protectedRoutes = new protectedRoutes();
      let protectedRoutesList = protectedRoutes.protectedRoutes
      const routes = protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} component={route.element} />
      ));
    } catch (exception) {
      console.log(exception)
    }

  return (<>
        <Header/>
        <Routes>    
          {/* <ProtectedRoutes /> */}
          {/* {protectedRoutes.protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
          />
        ))} */}
          <Route path="/" element={<App />} />
          <Route path="test" element={<Profile />} />
          <Route path="userList" element={<UserList />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="Groupe" element={<Groupe />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="auth" element={<Login />} />
        </Routes>
  </>
  );
};

export default Router;
