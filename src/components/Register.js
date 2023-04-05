import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../utils/useFormValidation';

function Register({ onRegister }) {
    const { values, handleChange, errors, resetValidation, isValid } =
        useFormValidation({});

    useEffect(() => {
        resetValidation();
    }, [resetValidation]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        const { email, password } = values;
        onRegister(email, password);
    }

    return (
        <section className='login'>
            <p className='login__title'>Регистрация</p>
            <form className='login__form'
                onSubmit={handleSubmit}>
                <input
                    className='login__input login__input_item_email'
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={values.email || ''}
                    onChange={handleChange}
                    minLength='2'
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
                    placeholder='Пароль'
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength='7'
                    maxLength='14'
                    required
                />
                <span
                    className={`form__input-error ${errors.password && 'form__input-error_active'
                        }`}
                >
                    {errors.password || ''}
                </span>

                <button
                    className={`login__button ${!isValid ? `login__button_disabled` : ``}`}
                    type='submit'
                > Зарегистрироваться
                </button>

            </form>
            <p className='login__signup'>
                Уже зарегистрированы? &nbsp;
                <Link className='login__signin' to='/sign-in'>
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default Register;