import React from 'react';
import successRegistration from '../../images/registration_success.svg';
import failRegistration from '../../images/registration_fail.svg';
import './InfoTooltip.css';

const InfoTooltip = ({ isOpen, onClose, isSucceeded, successMessage, failMessage }) => {
    return (
        <div className={`popup popup-tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button 
                    className="popup__close-button" 
                    type="button"
                    onClick={onClose}>
                </button>
                <img 
                    src={isSucceeded ? successRegistration : failRegistration}
                    alt=""
                    className="popup-tooltip__image" 
                />
                <h2
                className="popup-tooltip__title">
                    {isSucceeded ? successMessage : failMessage}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;