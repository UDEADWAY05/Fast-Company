import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RafioField from "../common/form/radio.Filed";
import MultiSelectField from "../common/form/multuSelectField";
import ChechBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male", qualities: [], licence: false });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [profession, setProfession] = useState();
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfession(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введён не коректн"
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
    console.log(target);
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
    console.log(data);
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
          <SelectField name="professions" label="Выбери свою профессию" options={profession} defaultOption={"Choose..."} onChange={handleChange} error={errors.profession} value={data.profession}/>
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
          <MultiSelectField options={qualities} defaultValue={data.qualities} onChange={handleChange} name="qualities" label="Ввыберите ваши качества" />
          <ChechBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>Потвердить <a>лицензионное соглашение</a></ChechBoxField>
          <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">submit</button>
        </form>
  );
};

export default RegisterForm;
