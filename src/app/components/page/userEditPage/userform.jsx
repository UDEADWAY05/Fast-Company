import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RafioField from "../../common/form/radio.Filed";
import MultiSelectField from "../../common/form/multuSelectField";
import PropTypes from "prop-types";
import BackButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessionById, getProfessions } from "../../../store/profession";

const UserForm =  ({ userId }) => {
  const history = useHistory()
  const [isLoading, setLoading] = useState()
  const { getUserById } = useUser()
  const { updateUser } = useAuth()
  const professions = useSelector(getProfessions())
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const userLook = getUserById(userId)
  const [user, setUser] = useState({
        image: userLook.image,
        rate: userLook.rate,
        completedMeetings: userLook.completedMeetings,
        licence: userLook.licence,
        _id: userLook._id,
        name: userLook.name,
        email: userLook.email,
        profession: useSelector(getProfessionById(userLook.profession)),
        sex: userLook.sex,
        qualities: userLook.qualities
  })
  useEffect(() => {
    if (user !== undefined &&  qualitiesLoading && professions !== undefined) {
      setLoading(false);
    }
  }, [])
  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, profession: user.profession.value})
    history.push(`/users/${userId}`)
  };
  
  if (!isLoading) {
    const qualitiesList = qualities.map(q => ({
      label: q.name,
      value: q._id
    }));  
    const proffesionsArray = professions.map(p => ({
      label: p.name,
      value: p._id
    }))
    const defaultQuality = userLook.qualities.map((qual) => qualities.find((q) => q._id === qual)).map(p => ({
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
                <SelectField name="profession" label="Выбери свою профессию" options={proffesionsArray} defaultOption={"Choose..."} onChange={handleChange} value={user.profession} objectOn={true}/>
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
