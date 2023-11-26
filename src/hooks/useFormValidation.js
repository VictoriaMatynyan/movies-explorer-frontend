// кастомный универсальный хук для управления состояниями полей формы
import { useState, useCallback } from 'react';

// регулярки для email и пароля
const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// обрабатываем обновления состояния формы и валидируем
function useFormValidation() {
    // состояние всех значений формы
    const [values, setValues] = useState({});
    // состояние всех ошибок для полей формы
    const [errors, setErrors] = useState({});
    // отслеживаем валидность формы
    const [formValid, setFormValid] = useState(false);

    // обработчик изменений в полях формы
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'name') {
           if (e.target.value === '') {
                // создаём кастомное сообщение об ошибке для элементов формы - setCustomValidity
                e.target.setCustomValidity('Поле не может быть пустым');
            } else if (e.target.value.length < 2) {
                e.target.setCustomValidity('Имя должно содержать минимум 2 символа');
            } else if (e.target.value.length > 30) {
                e.target.setCustomValidity('Имя должно содержать максимум 30 символов');
            } else {
                e.target.setCustomValidity('');
            }
        } else if (name === 'email') {
            if (value === '') {
                e.target.setCustomValidity('Поле не может быть пустым');
            } else if (!value.match(regExEmail)) {
                e.target.setCustomValidity('Некорректный формат E-mail');
            } else {
                e.target.setCustomValidity('');
            }
        } else if (name === 'password') {
            if (value === '') {
                e.target.setCustomValidity('Поле не может быть пустым');
            } else if (!value.match(regExPassword)) {
                e.target.setCustomValidity('Пароль должен содержать не менее 8 символов, цифры и буквы');
            } else {
                e.target.setCustomValidity('');
            }
        } else {
            e.target.setCustomValidity('');
        }
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: e.target.validationMessage});
        const form = e.target.closest('form');
        setFormValid(form ? form.checkValidity() : false);
        // setFormValid(e.target.closest('form').checkValidity());
    }
    
    // сбрасываем состояния формы, устанавливаем новые значения
    const resetFormValues = useCallback((values = {}, errors = {}, formValid = false) => {
        setValues(values);
        setErrors(errors);
        setFormValid(formValid);
    }, [setValues, setErrors, setFormValid]
    );

    return {
        values,
        errors,
        formValid,
        handleInputChange,
        resetFormValues
    }
}

export default useFormValidation;