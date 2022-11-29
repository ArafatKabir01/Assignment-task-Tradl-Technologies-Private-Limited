import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const UpdateProfile = () => {
    const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, setUpdateProfile] = useState({})
    let { id } = useParams()

    useEffect(() => {
        const geturl = `https://tradl-technologies-private-limited-server.vercel.app/user?email=${user.email}`
        fetch(geturl, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setUpdateProfile(data[0]))

    }, [user])
    console.log(updateProfile)


    const { register, handleSubmit, watch, reset, resetField, formState: { errors } } = useForm();
    if (!updateProfile) {
        return <div className='ml-auto mr-auto mt-2'><button className="btn btn-square  loading"></button></div>
    }

    const onSubmit = data => {
        const url = `https://tradl-technologies-private-limited-server.vercel.app/user/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resetField()
                navigate("/")

            })
    }
    const handleCancle = () => {
        navigate("/")
    }

    return (
        <div className='bg-base-100	 h-screen'><br /><br /><br />
            <form className='' id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="hero  ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl">
                            <div className="card-body">
                                <div className="form-control w-72 md:w-72 lg:w-80">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input defaultValue={updateProfile?.displayName} name='name' {...register("displayName", { required: true })} type="text" className="input input-bordered" />
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input defaultValue={updateProfile?.phoneNumber} {...register("phoneNumber", { required: true })} type="text" className="input input-bordered" />
                                    <label className="label">
                                        <span className="label-text">Place</span>
                                    </label>
                                    <input defaultValue={updateProfile?.place} {...register("place", { required: true })} type="text" className="input input-bordered" />
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                    <div className="modal-action">
                                        <label onClick={() => handleCancle()} className="btn btn-circle btn-outline btn-warning">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>`

        </div>
    )
}

export default UpdateProfile