import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserList from './pages/UserList';
import User from './pages/User';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes
} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/store'
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="userList" element={<UserList />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="auth" element={<Login />} />
        </Routes>
      </BrowserRouter>  
    </Provider>
  </React.StrictMode>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
