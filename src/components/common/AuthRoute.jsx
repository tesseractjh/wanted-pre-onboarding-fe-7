import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute({ redirect, reversed }) {
  const accessToken = localStorage.getItem('accessToken');
  const isAuthorized = reversed ? !accessToken : accessToken;
  return isAuthorized
    ? <Outlet />
    : <Navigate to={redirect} />
}

export default AuthRoute;
