import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RafioField from "../common/form/radio.Filed";
import MultiSelectField from "../common/form/multuSelectField";
import ChechBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/profession";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({ name: "", email: "", password: "", profession: "", sex: "male", qualities: [], licence: false });
  const qualities = useSelector(getQualities())
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions())
  const qualitiesList = qualities.map(q => ({
    label: q.name,
    value: q._id
  }));
  const professionsList = professions.map(p => ({
    label: p.name,
    value: p._id
  }));
    
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введён не коректн"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно быть минимум из 3 символов",
        value: 3
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
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу прифессию"
      }
    },
    licence: {
      isRequired: {
        message: "Вы не можете использовать наш сервис без использования лецензионного соглашения"
      }
    }
  };
  const handleChange = (target) => {
    console.log(target)
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(signUp({...data, profession: data.profession.value }));
    // history.push("/")
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
              label="имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
          />
          <TextField
              label="пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
          />
          <SelectField name="profession" label="Выбери свою профессию" options={professionsList} defaultOption={"Choose..."} onChange={handleChange} error={errors.profession} value={data.profession} objectOn={true}/>
          <RafioField options={[
            { name: "male", value: "male" },
            { name: "famale", value: "famale" },
            { name: "Other", value: "other" }
          ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            label="Выберите ваш пол"
          />
          <MultiSelectField options={qualitiesList} defaultValue={data.qualities} onChange={handleChange} name="qualities" label="Ввыберите ваши качества" />
          <ChechBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>Потвердить <a>лицензионное соглашение</a></ChechBoxField>
          <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">submit</button>
        </form>
  );
};

export default RegisterForm;
