import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, loggedIn, onSignOut, title, link }) {
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt='Логотип' />
            <nav className='header__container'>
                <p className='header__email'>{email}</p>
                {loggedIn ? (
                    <button className='header__button'
                        onClick={onSignOut}>
                        {title}
                    </button>
                ) : (
                    <Link to={link} className='header__link'>
                        {title}
                    </Link>
                )}
            </nav>
        </header>
    );
}



export default Header;