/* eslint-disable react/prop-types */
import { useContext } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Context } from './contexts/AuthContext';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ChangeEmail from './pages/ChangeEmail';

function PrivateRoute({ authenticated, children }) {
  return authenticated ? children : <Navigate to="/" replace />;
}

function NotPrivateRoute({ authenticated, children }) {
  return !authenticated ? children : <Navigate to="/" replace />;
}

export default function CustomRoutes() {
  const { authenticated } = useContext(Context);

  return (
    <Routes>
      <Route
        path="/"
        element={
        authenticated
          ? <Home />
          : <LogIn />
        }
      />
      <Route
        path="/newcontact"
        element={(
          <PrivateRoute
            authenticated={authenticated}
          >
            <NewContact />
          </PrivateRoute>
        )}
      />
      <Route
        path="/editcontact/:id"
        element={(
          <PrivateRoute
            authenticated={authenticated}
          >
            <EditContact />
          </PrivateRoute>
        )}
      />
      <Route
        path="/changeemail"
        element={(
          <PrivateRoute
            authenticated={authenticated}
          >
            <ChangeEmail />
          </PrivateRoute>
        )}
      />
      <Route
        path="/changepassword"
        element={(
          <PrivateRoute
            authenticated={authenticated}
          >
            <ChangePassword />
          </PrivateRoute>
        )}
      />
      <Route
        path="/signup"
        element={(
          <NotPrivateRoute authenticated={authenticated}>
            <SignUp />
          </NotPrivateRoute>
        )}
      />
      <Route
        path="/forgot-password"
        element={(
          <NotPrivateRoute authenticated={authenticated}>
            <ForgotPassword />
          </NotPrivateRoute>
        )}
      />
      <Route
        path="/reset-password/:email"
        element={(
          <NotPrivateRoute authenticated={authenticated}>
            <ResetPassword />
          </NotPrivateRoute>
        )}
      />
    </Routes>
  );
}
