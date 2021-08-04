

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    console.log(bookings);
    return (
        <div>
            <h3>You have: {bookings.length} bookings</h3>
            {
                bookings.map(book => <li key={book._id}>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;

// import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../App';

// const Bookings = () => {
//     const [bookings, setBooking] = useState([])
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext)
//     useEffect(() => {
//         fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {

//             headers: {
//                 'authorization': `Bearer ${sessionStorage.getItem('token')}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 setBooking(data)
//             })
//     }, [])
//     return (
//         <div>
//             <h1>you have:  {bookings.length} bookings</h1>
//             {
//                 bookings.map(book => <li>{book.name}</li>)
//             }
//         </div>
//     );
// };

// export default Bookings;