import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import ChechBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён не коректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хоть одну заглавную букву"
            },
            isCounteinDigit: {
                message: "Пароль должен содержать хоть одну цифру"
            },
            min: {
                message: "Пароль должен быть минимум из 8 символов",
                value: 8
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [data]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
        dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <ChechBoxField value={data.stayOn} onChange={handleChange} name="stayOn" >Оставаться в системе</ChechBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">submit</button>
        </form>
    );
};

export default LoginForm;
