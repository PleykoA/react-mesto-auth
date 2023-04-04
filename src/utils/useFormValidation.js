import { useState, useCallback } from 'react';

function useFormValidation() {
    const [values, setValues] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});

    function handleChange(evt) {
        const { value, name } = evt.target;
        setValues((values) => ({ ...values, [name]: value }));
        setErrors((errors) => ({ ...errors, [name]: evt.target.validationMessage }));
        setIsValid(evt.target.closest('form').checkValidity());
    };

    const resetValidation = useCallback((values = {}, valid = false, error = {}) => {
        setValues(values);
        setIsValid(valid);
        setErrors(error);
    },
        [setValues, setIsValid, setErrors]
    );

    return {
        values,
        setValues,
        isValid,
        setIsValid,
        resetValidation,
        handleChange,
        errors
    };
}

export default useFormValidation;
