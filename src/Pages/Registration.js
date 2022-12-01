import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../firebase.init';
import img from '../image/login_background...jpg'
import useTokens from './Hook/useTokens';
const Registration = () => {
    const [usersData , setUsersData] = useState({})
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useTokens(user)
    const navigate = useNavigate()
    let errorLogin;
    let cheqLoading;

    if (error) {
        errorLogin = <p className='text-red-600'>Email is already taken</p>
    }
    if (loading) {
        cheqLoading = <div className='ml-auto mr-auto mt-2'><button className="btn btn-square bg-none loading"></button></div>;
    }
    if (token) {
        const userData = {
            displayName : usersData.displayName,
            email: usersData.email,
            phoneNumber:usersData.phoneNumber,
            place : usersData.place
        }
         fetch('https://registrar-app.onrender.com/alluser',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(userData)

        } )
        .then(res => res.json())
        .then(data => console.log(data))
        navigate('/')

        
    }
    let passwordError;
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        console.log(data)
        setUsersData(data)  
    }
    return (
        <div style={{ backgroundImage: `url("${img}")` }} className="bg-no-repeat bg-center  bg-cover " >
            <div className=" hero-overlay bg-opacity-40 ">
                <div className='container hero min-h-screen m-auto'>
                    <div className=" flex-col lg:flex-row-reverse p-4 w-full md:w-7/12 lg:w-7/12 ">
                        <div style={{ backgroundImage: `url("${img}")` }} className=" flex-shrink-0 bg-no-repeat bg-center bg-cover  shadow-2xl rounded  ">

                            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                                <h2 className='font-bold text-2xl text-center '>Register Here</h2>
                                <div className='grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-3'>
                                    <div>
                                        <div className="form-control  ">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input {...register("displayName", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                            {errors.displayName?.type === 'required' && <p className='text-red-600'>Name is required</p>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                            {errors.email?.type === 'required' && <p className='text-red-600'>Email is required</p>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input className="input input-bordered" type="password" placeholder='Password' name="password" {...register("password", { required: "Password is required", minLength: { value: 8 } })}></input>
                                            <div className='text-red-600'>{errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be more than 8 characters</p>}</div>
                                            <p>{errors.password?.message}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input {...register("phoneNumber", { required: true })} type="number" placeholder="Phone Number" className="input input-bordered" />
                                            {errors.number?.type === 'required' && <p className='text-red-600'>Phone Number is required</p>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Your Location</span>
                                            </label>
                                            <input {...register("place", { required: true })} type="text" placeholder="Your Location" className="input input-bordered" />
                                            {errors.displayName?.type === 'required' && <p className='text-red-600'>Place is required</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control">

                                    <label className="label ">
                                        <span className="label-text-alt text-xl">Already have an Account? <Link className="link link-hover text-emerald-500" to='/login'>Login Please</Link></span>
                                    </label>
                                </div>

                                <div className="flex flex-col w-full border-opacity-50">
                                    <div className="form-control mt-6 px-8 ">
                                        <button className="btn btn-primary border-0 rounded bg-emerald-500">SignUp</button>
                                    </div>
                                    {errorLogin}
                                    {cheqLoading}
                                    {passwordError}
                                    
                                </div>
                            </form>



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Registration