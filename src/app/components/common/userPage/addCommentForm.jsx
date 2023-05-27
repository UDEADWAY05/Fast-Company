import React, { useEffect, useState } from "react";
import API from "../../../API";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddComentForm = ({ onChange }) => {
  const { userId } = useParams();
  const [users, setUsers] = useState();
  const [comment, setComment] = useState({ userId: "", pageId: userId, content: "" });
  const [userComment, setUserComment] = useState("");
  const [errors, setErrors] = useState({});
  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите от чьего имени вы хотите отправить сообщение"
      }
    },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };
  const validate = () => {
    const errors = validator(comment, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const clearForm = () => {
    setComment({ userId: "", pageId: userId, content: "" });
    setUserComment("");
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onChange(comment);
    clearForm();
  };
  const handleChange = (target) => {
    setComment((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleUser = (target) => {
    const i = users.filter((user) => (user.name === target.value.name));
    handleChange({ name: "userId", value: i[0]._id });
    setUserComment(target.value.name);
  };
  return <div className="card mb-3">
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <h2>New comment</h2>
        <SelectField
          name="user"
          label=""
          options={users} defaultOption={"Выберите пользователя"}
          onChange={handleUser}
          value={userComment}
          objectOn={true}
          error={errors.userId}
        />
        <TextAreaField onChange={handleChange} error={errors.content} value={comment.content} nameLab="TextAreaFormComment" label="Сообщение"/>
        <div className="d-flex justify-content-end" >
          <button type="submit" className="btn btn-primary ">Опубликовать</button>
        </div>
      </form>
    </div>
  </div>;
};

AddComentForm.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default AddComentForm;
