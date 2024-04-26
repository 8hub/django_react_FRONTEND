import React from 'react';
import { BsAirplaneEngines } from "react-icons/bs";
import FlyingIcon from './FlyingIcon';
const Header = () => {

    return (
        <div className="text-center">
            <span className="display-1">Student Management System</span>
            <hr/>
            <h5>presents</h5>
            <h1>App with React & Django <FlyingIcon/></h1>
        </div>
    );
};

export default Header;