import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';

const Home = () => {
    const [images,setImages]=useState([])
    useEffect(()=>{
        fetch('https://api.mocki.io/v1/ec7a9d41')
        .then(res=>res.json())
        .then(data=>setImages(data))

    })
    return (
        <div>
            <h1>hello</h1>
           {
               images.map(image=><Event imgItem={image}></Event>)
           }
        </div>
    );
};

export default Home;