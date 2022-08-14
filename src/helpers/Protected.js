import { Navigate } from 'react-router-dom';

// Helper to check if the user us logged in and redirect if not 
const Protected = ({children}) => {
  const is_logged_in = !!(localStorage.getItem('token') && localStorage.getItem('token') !== "");
  
  return is_logged_in === true
    ? children
    : <Navigate to="/login" replace />;
}

export default Protected;
