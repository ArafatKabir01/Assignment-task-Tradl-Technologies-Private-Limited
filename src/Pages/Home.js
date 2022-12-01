import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import auth from '../firebase.init';
import img from '../image/login_background...jpg'
const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user)
    const [currentUser, setcurrentUser] = useState([])
    console.log(currentUser)

    const navigate = useNavigate()
    console.log(currentUser)
    useEffect(() => {
        if(loading){
            return <p>Loading....</p>
        }
        const geturl = `https://registrar-app.onrender.com/user?email=${user?.email}`
        fetch(geturl, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setcurrentUser(data[0]))
    }, [user]);
    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')
    }
    const handleUpdate = id =>{
        navigate(`/profile/update/${id}`)
            }
    return (
        <div style={{ backgroundImage: `url("${img}")` }} className="bg-no-repeat bg-center bg-cover" >
            <div className=" hero-overlay bg-opacity-40 ">
                <div className=" min-h-screen container m-auto ">
                    <div className=" flex justify-center">
                        <div className="card w-7/12 bg-base-100 shadow-xl my-10">
                            <div className="card-body items-center  ">
                                <h2 className="card-title font-bold text-5xl my-5">{currentUser?.displayName?.toUpperCase()}</h2>
                                <div className='text-left text-xl'>
                                    <p><span className='font-bold'>Email</span> : {currentUser?.email}</p>
                                    <p><span className='font-bold'>Phone Number</span> : {currentUser?.phoneNumber}</p>
                                    <p><span className='font-bold' >Place</span> : {currentUser?.place}</p>
                                    <div className='my-5'>
                                        <button onClick={()=>handleUpdate(currentUser?._id)} htmlFor="my-modal-6" className="btn btn-outline btn-primary me-6">Update Profile</button>
                                        <button onClick={logOut} className="btn btn-primary mx-6 ">Logout</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home