import React, {useState} from 'react';
import { BsAirplaneEngines } from "react-icons/bs";

const FlyingIcon = () => {
  const [flying, setFlying] = useState(false);

  const startAnimation = () => {
    setFlying(true);
    setTimeout(() => {
      setFlying(false);
    }, 2000);
  }
  
  return (
    <span 
    className={`icon-plane ${flying ? 'animate' : ''}`}
    onMouseEnter={startAnimation}
    >
      <BsAirplaneEngines className='icon-plane'/>
    </span>
  )
}

export default FlyingIcon;