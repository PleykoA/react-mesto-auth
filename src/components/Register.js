import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../utils/useFormValidation';

function Register({ onRegister }) {
    const { values, errors, handleChange, resetValidation, isValid } =
        useFormValidation({});

    useEffect(() => {
        resetValidation();
    }, [resetValidation]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        onRegister(values);
    }

    return (
        <div className='login'>
            <p className='login__title'>Регистрация</p>
            <form className='login__form'
                onSubmit={handleSubmit}>
                <input
                    className='login__input login__input_item_email'
                    type='email'
                    name='email'
                    value={values.email || ''}
                    onChange={handleChange}
                    placeholder='Email'
                    minLength='5'
                    maxLength='30'
                    required
                />
                <span
                    className={`form__input-error ${errors.email && 'form__input-error_active'}`}
                >
                    {errors.email || ''}
                </span>

                <input
                    className='login__input login__input_item_password'
                    type='password'
                    name='password'
                    value={values.password || ''}
                    onChange={handleChange}
                    placeholder='Пароль'
                    minLength='5'
                    maxLength='30'
                    required
                />
                <span
                    className={`form__input-error ${errors.password && 'form__input-error_active'
                        }`}
                >
                    {errors.password || ''}
                </span>

                <button
                    className={`login__submit ${!isValid ? `login__submit_disabled` : ``}`}
                    type='submit'
                > Зарегистрироваться
                </button>

            </form>
            <p className='login__signup'>
                Уже зарегистрированы? &nbsp;
                <Link className='login__signin' to='/sign-in'>Войти</Link>
            </p>
        </div>
    );
}

export default Register;