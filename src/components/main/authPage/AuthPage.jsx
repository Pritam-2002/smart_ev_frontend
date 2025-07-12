// import React, { useState } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import Login from "../../shared/auth/login/Login"
// import Signup from '../../shared/auth/login/Login';

// const AuthPage = () => {
//   const [isLoading, setISLoading] = useState(false);
//   const [isLogin, setISLogIn] = useState(true);
//   const { user, setuser, token, setToken, loading, login, logout } = useAuth();

//   return (
//     <div>
//       <h2>{isLogin ? 'Login' : 'Signup'} Page</h2>
//       {isLogin ? (
//         <Login user={user} />
//       ) : (
//         <Signup />
//       )}
//       <button onClick={() => setISLogIn(!isLogin)}>
//         {isLogin ? 'Go to Signup' : 'Go to Login'}
//       </button>
//     </div>
//   );
// };

// export default AuthPage;
