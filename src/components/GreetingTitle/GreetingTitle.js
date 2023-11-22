import React from 'react';
import './GreetingTitle.css';

const GreetingTitle = ({ className, greetingText }) => {
    return (
        <h3 className={className}>{greetingText}</h3>
    )
}

export default GreetingTitle;