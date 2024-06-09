import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    // console.log(error);

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Something went wrong</h1>
                <h1 className="text-6xl md:text-7xl my-2 font-bold text-primary">{error?.status}</h1>
                {error && (
                    <p className="text-base md:text-lg mt-2 text-base-content">
                        <i>{error.statusText || error.message}</i>
                    </p>
                )}
                <p className="text-lg md:text-2xl mt-4">Oops! An unexpected error has occurred.</p>
                <Link to="/" className="btn btn-primary mt-6">Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;