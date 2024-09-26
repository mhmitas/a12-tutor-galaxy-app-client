import React, { useState } from 'react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import saveUserInDb from '../../utils/saveUserInDb';
import LoadingSpinner from '../../components/common/LoadingSpinner';


const SignIn = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const { register, handleSubmit, } = useForm()
    const { signIn, signInWithProvider, setAuthLoading, user, authLoading } = useAuth()
    const [processing, setProcessing] = useState(false)

    const from = location.state?.from?.pathname
    // console.log(from);

    async function onSubmit(data) {
        // console.log(data);
        try {
            setProcessing(true)
            const result = await signIn(data.email, data.password)
            console.log(result.user);
            toast.success('Sign in Successfully')
            navigate(from ? from : '/')
            setProcessing(false)
        } catch (err) {
            console.error(err);
            toast.error(err?.message)
            setAuthLoading(false)
            setProcessing(false)
        }
    }

    async function handleProviderSignIn(provider) {
        try {
            const result = await signInWithProvider(provider)
            await saveUserInDb({ ...result.user, role: 'student' });
            toast.success('Sign in successfully')
            navigate(from ? from : '/')
        } catch (err) {
            toast.error(err?.message)
            console.error(err);
            setAuthLoading(false)
        }
    }

    if (authLoading) {
        return <LoadingSpinner />
    } else if (user) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='min-h-screen flex flex-col justify-center mb-10'>
            <div>
                <div className='md:text-3xl text-2xl font-bold text-center mt-4 mb-8'><Link to='/'>TutorGalaxy</Link></div>
                <div className='max-w-md mx-auto sm:p-8 p-6 bg-base-100 shadow-lg rounded-md '>
                    <h3 className='text-3xl font-semibold text-center mb-6'>Sign in</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                autoFocus
                                type="email"
                                required
                                {...register("email")}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                required
                                {...register("password")}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control pt-4">
                            <button disabled={processing} className='btn btn-primary disabled:bg-primary disabled:text-primary-content disabled:bg-opacity-85'>
                                {processing ?
                                    <span className='loading loading-spinner'></span> :
                                    "Log in"
                                }
                            </button>
                        </div>
                    </form>
                    <p className="mt-6">
                        Don't have an account? Please
                        <Link to="/sign-up" className="link link-primary ml-2">
                            Sign up
                        </Link>
                    </p>
                    <div className="divider mt-6">Or continue with</div>
                    <div className="form-control">
                        <div className="flex flex-col items-center gap-3 justify-center mt-4">
                            <button
                                onClick={() => handleProviderSignIn(googleProvider)}
                                className="btn btn-outline btn-icon btn-google w-full text-lg">
                                <FcGoogle className='text-2xl' /> Google
                            </button>
                            <button
                                onClick={() => handleProviderSignIn(githubProvider)}
                                className="btn btn-outline btn-icon btn-google w-full text-lg">
                                <FaGithub className='text-xl' /> Github
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ReactHelmet title="Login"></ReactHelmet> */}
        </div>
    );
};

export default SignIn;