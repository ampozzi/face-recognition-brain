import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './icons8-brain-80.png';
import './Logo.css';

const Logo=()=>{
    return(
        <div className='ma4 mt0'>
            <Tilt tiltMaxAngleY='30' tiltMaxAngleX='30' style={{height:80,width:80}}>
                <div className="">
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;