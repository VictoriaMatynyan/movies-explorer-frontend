import React from 'react';
import './GreetingTitle.css';

const GreetingTitle = ({ greetingText }) => {
    return (
        <h3 className="greeting-title">{greetingText}</h3>
    )
}

export default GreetingTitle;