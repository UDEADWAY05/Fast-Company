import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.servise";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  });
  function logout() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }
  function randomInt(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min)
  }
  async function signUp({email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post("accounts:signUp", { email, password, returnSecureToken: true })
      setTokens(data)
        await createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            ...rest,
        })   
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
    try {
        const { data } = await httpAuth.post("accounts:signInWithPassword", { email, password, returnSecureToken: true })
        setTokens(data)
        await getUserData()
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
  async function updateUser(user) {
    try {
       const { content } = await userService.updateUser(user)
    } catch (error) {
        errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };
  async function getUserData() {
    try {
        const { content } = await userService.getCurrentUser()
        setUser(content)
    } catch (error) {
        errorCatcher(error)
    } finally {
        setIsLoading(false)
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
        getUserData()
    } else {
        setIsLoading(false)
    }
  }, [])
  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content)
      setUser(content);  
    } catch(error) {
      errorCatcher(error)
    }
  }
  
  async function loginUser(data) {
    try {
        const resp = userService.login(data)
        // resp.then(data => console.log(data.content))
    } catch (error) {
        errorCatcher(error)
    }
  }

  
  return (
      <AuthContext.Provider value={{ signUp, signIn, currentUser, logout, updateUser }}>
      { !isLoading? children : "Loading" }
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