import './Logo.css';
// при клике на лого перенаправим на главную страницу
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Logo = () => {
    return (
        <Link to='/'>
            <img
                src={logo}
                alt="Логотип сайта, большая белая буква С на фоне зелёного кружка"
                className="logo"
            />
        </Link>
    )
}

export default Logo;