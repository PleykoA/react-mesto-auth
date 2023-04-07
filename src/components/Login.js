import { useEffect } from 'react';
import useFormValidation from '../utils/useFormValidation';

function Login({ onLogin }) {
    const { values, errors, handleChange, resetValidation, isValid } =
        useFormValidation({});

    useEffect(() => {
        resetValidation();
    }, [resetValidation]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        const { email, password } = values
        onLogin(email, password);
    }

    return (
        <div className='login'>
            <p className='login__title'>Вход</p>
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
                >
                    Войти</button>
            </form>
        </div>
    );
}

export default Login;