import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/home/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import Dashboard from "../layouts/Dashboard";
import CreateStudySession from "../pages/Dashboard/tutor/CreateStudySession";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ],
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    // dashboard routes
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            // tutor related routes
            {
                path: 'create-study-session',
                element: <CreateStudySession />
            }
        ]
    }
])