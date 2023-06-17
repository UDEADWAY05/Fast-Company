import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.servise";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage";

const httpAuth = axios.create()
const AuthContext = React.createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [curretnUser, setUser] = useState()
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  });
    
  async function signUp({email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      await createUser({_id: data.localId, email, ...rest})   
    } catch (error) {
        errorCatcher(error)
        const { code, message } = error.response.data.error
        if (code === 400) {
            if (message === "EMAIL_EXISTS") {
                const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                }
                throw errorObject;
            }
        }
    }
  }
  async function signIn({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
        const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
        setTokens(data)
        await loginUser({ _id: data.localId, email, ...rest })
    } catch (error) {
        errorCatcher(error)
        const { code, message } = error.response.data.error
        if (code === 400) {
            if (message === "EMAIL_NOT_FOUND") {
                const errorObject = {
                    email: "Пользователя с таким Email не существует"
                }
                throw errorObject;
            } else if (message === "INVALID_PASSWORD") {
                const errorObject = {
                    password: "Неправильный пароль"
                }
                throw errorObject;                
            }
        }
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    console.log(error);
    setError(message);
  }
  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setUser(content);  
    } catch(error) {
      errorCatcher(error)
    }
  }
  
  async function loginUser(data) {
    try {
        const resp = userService.login(data)
        resp.then(data => console.log(data.content))
    } catch (error) {
        errorCatcher(error)
    }
  }

  
  return (
      <AuthContext.Provider value={{ signUp, signIn, curretnUser }}>
      { children }
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;