import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router";
import RegisterForm from "../components/ui/registarForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                {formType === "register"
                    ? <>
                        <h3 className="mb-4">Register</h3>
                        <RegisterForm />
                        <p>Alredy have account? <a role="button" onClick={toggleFormType}>Sing In</a></p>
                    </>
                    : <>
                        <h3 className="mb-4">Login</h3>
                        <LoginForm />
                        <p>Dont have account? <a role="button" onClick={toggleFormType}>Sing Up</a></p>
                    </>
                }
            </div>
        </div>
    </div>;
};

export default Login;
