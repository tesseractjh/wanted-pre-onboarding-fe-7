import { Navigate } from 'react-router-dom';

function AuthRoute({ redirect, element, reversed }) {
  const accessToken = localStorage.getItem('accessToken');
  const isAuthorized = reversed ? !accessToken : accessToken;
  return isAuthorized
    ? element
    : <Navigate to={redirect} />
}

export default AuthRoute;
