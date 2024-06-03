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
import SessionDetail from "../pages/session-detail/SessionDetail";
import AllStudySessions from "../pages/Dashboard/tutor/AllStudySessions";
import UploadMaterials from "../pages/Dashboard/tutor/UploadMaterials";
import ViewAllMaterials from "../pages/Dashboard/tutor/ViewAllMaterials";
import BookedSessions from "../pages/Dashboard/student/BookedSessions";
import BookedSessionDetail from "../pages/Dashboard/student/BookedSessionDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'detail/:id',
                element: <SessionDetail />
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
            // student related routes
            {
                path: 'view-booked-sessions',
                element: <BookedSessions />
            },
            {
                path: 'booked-session-detail/:id',
                element: <BookedSessionDetail />
            },
            // tutor related routes
            {
                path: 'create-study-session',
                element: <CreateStudySession />
            },
            {
                path: 'all-study-sessions',
                element: <AllStudySessions />
            },
            {
                path: 'upload-materials',
                element: <UploadMaterials />
            },
            {
                path: 'view-all-materials',
                element: <ViewAllMaterials />
            },
        ]
    }
])