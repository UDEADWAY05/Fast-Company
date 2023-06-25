import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RafioField from "../common/form/radio.Filed";
import MultiSelectField from "../common/form/multuSelectField";
import PropTypes from "prop-types";
import API from "../../API";
import BackButton from "../common/backButton";
import { useUser } from "../../hooks/useUsers";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQuality";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const UserForm =  ({ userId }) => {
  const history = useHistory()
  const { getUserById } = useUser()
  const { updateUser } = useAuth()
  const { getProfession, professions } = useProfessions()
  const { qualities, getQuality } = useQualities();
  const userLook = getUserById(userId)
    const [user, setUser] = useState({
        image: userLook.image,
        rate: userLook.rate,
        completedMeetings: userLook.completedMeetings,
        licence: userLook.licence,
        _id: userLook._id,
        name: userLook.name,
        email: userLook.email,
        profession: userLook.profession,
        sex: userLook.sex,
        qualities: userLook.qualities
    })
  const defaultProffession = getProfession(user.profession)
  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user)
    history.push(`/users/${userId}`)
  };
  
  if (user !== undefined && qualities !== undefined && professions !== undefined) {
    const qualitiesList = qualities.map(q => ({
      label: q.name,
      value: q._id
    }));  
    const proffesionsArray = professions.map(p => ({
      label: p.name,
      value: p._id
    }))
    const defaultQuality = userLook.qualities.map((qual) => getQuality(qual)).map(p => ({
      label: p.name,
      value: p._id
    }))
    return (
      <div className="container mt-5">
        <BackButton />
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
                <SelectField name="profession" label="Выбери свою профессию" options={proffesionsArray} defaultOption={"Choose..."} onChange={handleChange} value={defaultProffession} objectOn={true}/>
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
                <MultiSelectField options={qualitiesList} defaultValue={defaultQuality} onChange={handleChange} name="qualities" label="Ввыберите ваши качества" />
                <button type="submit" className="btn btn-primary w-100 mx-auto">submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <div className="container mt-5">
    <BackButton />
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
