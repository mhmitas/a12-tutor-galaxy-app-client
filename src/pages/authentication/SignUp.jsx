import React from 'react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import toast from "react-hot-toast";
import saveUserInDb from '../../utils/saveUserInDb';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const SignUp = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, } = useForm()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const { createUser, updateUserProfile, signInWithProvider, setAuthLoading, authLoading, user } = useAuth()

    async function onSubmit(data) {
        // console.log(data);
        try {
            const result = await createUser(data.email, data.password);
            await updateUserProfile(data.userName)
            await saveUserInDb({ ...result.user, role: data.role });
            toast.success('Sign up successfully')
            navigate('/')
        } catch (err) {
            toast.error(err?.message)
            console.error(err);
            setAuthLoading(false)
        }
    }

    async function handleProviderSignIn(provider) {
        try {
            const result = await signInWithProvider(provider)
            await saveUserInDb({ ...result.user, role: 'student' });
            toast.success('Sign up successfully')
            navigate('/')
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
        <div className='min-h-screen '>
            <div className='my-12'>
                <div className='md:text-3xl text-2xl font-bold text-center mt-4 mb-8'><Link to='/'>TutorGalaxy</Link></div>
                <div className='max-w-md mx-auto sm:p-12 p-7 bg-base-100 shadow-lg rounded-md '>
                    <h3 className='text-3xl font-semibold text-center mb-6'>Sign up</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full *:mb-3'>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                autoFocus
                                type="text"
                                required
                                {...register("userName")}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
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
                                {...register("password", { required: true, minLength: 6 })}
                                type='text'
                                className='input input-bordered'
                                required
                                name="password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Your Role</span>
                            </label>
                            <select {...register('role')} className="select select-bordered w-full">
                                <option value='student'>Student</option>
                                <option value='tutor'>Tutor</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>

                        <div className="form-control mt-8">
                            <input type="submit" className="btn btn-primary" value="Sign up" />
                        </div>
                    </form>
                    <p className="my-6">
                        Already have an account? Please
                        <Link to="/sign-in" className="link link-primary ml-2">
                            Sign in
                        </Link>
                    </p>
                    <div className="divider mt-6">Or continue with</div>
                    <div className="form-control">
                        <div className="flex flex-col items-center gap-3 justify-center mt-4">
                            <button
                                onClick={() => handleProviderSignIn(googleProvider)}
                                className="btn btn-outline btn-icon btn-google w-full text-lg">
                                <FaGoogle className='text-xl' /> Google
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
            {/* <ReactHelmet title="Sign up"></ReactHelmet> */}
        </div >
    );
};

export default SignUp;