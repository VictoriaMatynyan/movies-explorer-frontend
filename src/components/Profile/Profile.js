import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import './Profile.css';

const Profile = ({ loggedIn }) => {
    // const [name, setName] = useState("Виктория");
    // const [email, setEmail] = useState("pochta@yandex.ru");
    // const [enteredName, setEnteredName] = useState("");
    
    // // добавляем валидацию формы
    // // создаём состояния, которые покажут, были мы в инпуте или нет. При касании инпута, он будет true
    // const [nameDirty, setNameDirty] = useState(false);
    // const [emailDirty, setEmailDirty] = useState(false);
    // // создаём состояния для отражения ошибки
    // const [nameError, setNameError] = useState('');
    // const [emailError, setEmailError] = useState('');
    // // создаём состояние, которое отвечает за валидность формы в целом
    // const [formValid, setFormValid] = useState(false);

    // const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // // логика валидации поля Имени
    // const validateName = (e) => {
    //     setEnteredName(e.target.value);
    //     if (e.target.value.length < 2 || e.target.value.length > 30) {
    //         setNameError('Имя должно содержать от 2 до 30 символов');
    //     } else {
    //     setNameError('');
    //     }
    //     // setName(e.target.value);
    //     // if (e.target.value.length < 2 || e.target.value.length > 30) {
    //     //     setNameError('Имя должно содержать от 2 до 30 символов');
    //     // } else {
    //     // setNameError('');
    //     // }
    // }

    // // логика валидации поля E-mail
    // const validateEmail = (e) => {
    //     setEmail(e.target.value);
    //     if (e.target.value.match(emailRegEx)) {
    //         setEmailError('');
    //     } else {
    //         setEmailError('Введите корректный e-mail');
    //     }
    // }
    
    // function handleChangeName(e) {
    //     // setName(e.target.value);
    //     setNameDirty(true);
    //     setEnteredName(e.target.value);
    //     validateName(e);
    // }

    // function handleChangeEmail(e) {
    //     setEmail(e.target.value);
    //     setEmailDirty(true);
    //     validateEmail(e);
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setFormValid(true);
    //     if (!nameError && !emailError) {
    //         setFormValid(true);
    //         setName(enteredName);
    //         setEmail(e.target.email.value);
    //     } else {
    //         setFormValid(false);
    //     }
    // }

    return (
        loggedIn ? (
            <section className="profile">
            <Header loggedIn={true} />
            <main className="profile__main">
                <GreetingTitle greetingText="Привет, Виктория!" />
                {/* <GreetingTitle greetingText={`Привет, ${name}!`} /> */}
                <form 
                className="profile__form"
                onSubmit={(e) => e.preventDefault()}>
                    <label className="profile__label" htmlFor="profile-name">
                        Имя
                        <input
                            className="profile__input"
                            id="profile-name"
                            name="name"
                            type="text"
                            placeholder="Виктория"
                            // value={enteredName}
                            minLength={2}
                            maxLength={30}
                            required
                            // onChange={}
                            autoComplete="off"
                        />
                    </label>
                    {/* <span className="profile__input_error">{(nameDirty && nameError) && nameError}</span> */}
                    <label className="profile__label" htmlFor="profile-email">
                    E-mail
                        <input
                            // onChange={}
                            className="profile__input"
                            id="profile-email"
                            name="email"
                            type="text"
                            placeholder="pochta@yandex.ru"
                            required
                            autoComplete="off"
                        />
                    </label>
                    {/* <span className="profile__input_error">{(emailDirty && emailError) && emailError}</span> */}
                </form>
                <nav className="profile__nav">
                    <button
                        className="profile__button_type_edit"
                        type="submit"
                        // onClick={}
                    >
                        Редактировать
                    </button>
                    <Link to="/signin" className="profile__link">
                        Выйти из аккаунта
                    </Link>
                </nav>
            </main>
        </section>
        ) : null
    )
}

export default Profile;

// в lvl-3 заменить валидацию на useForm