export function validator(data, config) {
    const errors = {};
    function validate(ValidateMethod, data, config) {
        let statusValidate;
        switch (ValidateMethod) {
        case "isRequired":
            if (typeof data === "boolean") { statusValidate = !data; } else if (typeof data === "string") {
                statusValidate = data.trim() === "";
            } else if (typeof data === "object") {
                statusValidate = data.label.trim() === "";
            }
            break;
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "isCounteinDigit": {
            const digitRexExp = /\d+/;
            statusValidate = !digitRexExp.test(data);
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const ValidateMethod in config[fieldName]) {
            const error = validate(ValidateMethod, data[fieldName], config[fieldName][ValidateMethod]);
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
