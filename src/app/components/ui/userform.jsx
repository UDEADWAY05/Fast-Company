import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RafioField from "../common/form/radio.Filed";
import MultiSelectField from "../common/form/multuSelectField";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../API";

const UserForm = ({ userId }) => {
  const [user, setUser] = useState({ name: "", email: "", profession: {}, sex: "male", qualities: [] });
  const [qualities, setQualities] = useState({});
  const [profession, setProfession] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.professions.fetchAll().then((data) => setProfession(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  const handleChange = (target) => {
    console.log(target);
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    API.users.update(userId, user);
    history.push("/users");
  };
  if (user !== undefined && qualities !== undefined && profession !== undefined) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <TextField
                  label="Имя"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
                <TextField
                  label="почта"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <SelectField name="profession" label="Выбери свою профессию" options={profession} defaultOption={"Choose..."} onChange={handleChange} value={user.profession} objectOn={true}/>
                <RafioField options={[
                  { name: "male", value: "male" },
                  { name: "famale", value: "famale" },
                  { name: "Other", value: "other" }
                ]}
                  value={user.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Выберите ваш пол"
                />
                <MultiSelectField options={qualities} defaultValue={user.qualities} onChange={handleChange} name="qualities" label="Ввыберите ваши качества" />
                <button type="submit" className="btn btn-primary w-100 mx-auto">submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <div className="container mt-5">
    <div className="row">
      <div className="col-md-6 offset-md-3 shadow p-4">
        Loading...
      </div>
    </div>
  </div>;
};

UserForm.propTypes = {
  userId: PropTypes.string
};

export default UserForm;
