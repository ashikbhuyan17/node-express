import React from 'react';
import './Event.css'

const Event = (props) => {
    const {img,name}=props.imgItem
    return (
        <div className='flex'>
        
            <div className="img-div">
            <img src={img} alt=""/>
            <h4>{name}</h4>

            </div>
        </div>
    );
};

export default Event;