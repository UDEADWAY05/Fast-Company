import React, { useState } from "react";
import TextAreaField from "../form/textAreaField";

import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddComentForm = ({ onChange }) => {
    const [comment, setComment] = useState({});
    const [errors, setErrors] = useState({});
    const validatorConfig = {
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

    const clearForm = () => {
        setComment({});
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

    return <div className="card mb-3">
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <TextAreaField onChange={handleChange} error={errors.content} value={comment.content || ""} nameLab="TextAreaFormComment" label="Сообщение" />
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
