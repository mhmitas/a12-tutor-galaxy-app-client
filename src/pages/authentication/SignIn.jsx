import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import saveUserInDb from '../../utils/saveUserInDb';


const SignIn = () => {
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const { register, handleSubmit, } = useForm()
    const { signIn, signInWithProvider, setAuthLoading } = useAuth()

    async function onSubmit(data) {
        // console.log(data);
        try {
            const result = await signIn(data.email, data.password)
            console.log(result.user);
            toast.success('Sign in Successfully')
            // navigate('/')
        } catch (err) {
            console.error(err);
            toast.error(err?.message)
            setAuthLoading(false)
        }
    }

    async function handleProviderSignIn(provider) {
        try {
            const result = await signInWithProvider(provider)
            await saveUserInDb({ ...result.user, role: 'student' });
            toast.success('Sign up successfully')
            // navigate('/')
        } catch (err) {
            toast.error(err?.message)
            console.error(err);
            setAuthLoading(false)
        }
    }

    console.log('TODO: ENSURE ALL REDIRECTS');

    return (
        <div className='min-h-screen flex flex-col justify-center'>
            <div>
                <div className='md:text-3xl text-2xl font-bold text-center mt-4 mb-8'><Link to='/'>TutorGalaxy</Link></div>
                <div className='max-w-md mx-auto sm:p-12 p-7 bg-base-100 shadow-lg rounded-md '>
                    <h3 className='text-3xl font-semibold text-center mb-6'>Sign in</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full  *:mb-4'>
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
                                type="text"
                                required
                                {...register("password")}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control my-8">
                            <input type="submit" className="btn btn-primary" value="Login" />
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
                        <div className="flex justify-center space-x-2 mt-4">
                            <button
                                onClick={() => handleProviderSignIn(googleProvider)}
                                className="btn btn-outline btn-icon btn-google w-full text-lg">
                                <FaGoogle className='text-xl' /> Google
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