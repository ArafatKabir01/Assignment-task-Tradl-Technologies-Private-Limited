
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../firebase.init';
import img from '../image/login_background...jpg'
import gimg from '../image/google.png'
import axios from 'axios';
import useTokens from './Hook/useTokens';
const Login = () => {
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, perror] = useSendPasswordResetEmail(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [token] = useTokens(user , loading)
  const navigate = useNavigate()
  let errorLogin;
  let cheqLoading;
  if (error) {
    errorLogin = <p className='text-red-600'>{error?.message}</p>
  }
  if (loading) {
    cheqLoading = <div className='ml-auto mr-auto mt-2'><button className="btn btn-square  loading"></button></div>;
  }
  let passwordError;
  const onSubmit = async data => {
    const email = data.email
    const password = data.password
    await signInWithEmailAndPassword(email, password);

  }
  if (token) {
    navigate("/");
  }
  return (
    <div style={{ backgroundImage: `url("${img}")` }} className="bg-no-repeat bg-center bg-cover" >
      <div className=" hero-overlay bg-opacity-40 ">
        <div className='container hero min-h-screen m-auto'>
          <div className=" flex-col lg:flex-row-reverse p-4 w-full md:w-5/12 lg:w-4/12 ">
            <div style={{ backgroundImage: `url("${img}")` }} className=" flex-shrink-0 bg-no-repeat bg-center bg-cover  shadow-2xl rounded  ">

              <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                <h2 className='font-bold text-2xl text-center '>Login Here</h2>
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
                  <label className="label">
                    <span className="label-text-alt text-xl ">Do not have an Account? <Link className="link link-hover text-emerald-500" to='/signup '>SignUp Please</Link></span>
                  </label>
                  <label htmlFor="my-modal" className="link link-hover text-emerald-900">Forget Password?</label>
                  {/* Put this part before </body> tag */}
                  <input type="checkbox" id="my-modal" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" />
                      </div>
                      <br/>
                      <button className='hover:text-emerald-900'
                        onClick={async () => {
                          const success = await sendPasswordResetEmail(email);
                          if (success) {
                            alert('Sent email');
                          }
                        }}
                      >
                        Reset password
                      </button>
                      <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Cancel</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full border-opacity-50">
                  <div className="form-control mt-6 px-8 ">
                    <button className="btn btn-primary border-0 rounded bg-emerald-500">Login</button>
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

export default Login