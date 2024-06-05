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
import CreateNote from "../pages/Dashboard/student/CreateNote";
import ManageNotes from "../pages/Dashboard/student/ManageNotes";
import UpdateNote from "../pages/Dashboard/student/UpdateNote";
import ViewAllStudyMaterials from "../pages/Dashboard/student/ViewAllStudyMaterilas";
import ViewSessionMaterials from "../pages/Dashboard/student/ViewSessionMaterials";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import AllStudySessionsAdmin from "../pages/Dashboard/admin/AllStudySessionsAdmin";
import UpdateStudySession from "../pages/Dashboard/shared/UpdateStudySession";
import ViewAllMaterialsAdmin from "../pages/Dashboard/admin/ViewAllMaterialsAdmin";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import Payment from "../pages/payment/Payment";

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
                element: <PrivateRoute>
                    <SessionDetail />
                </PrivateRoute>
            },
            {
                path: 'test',
                element: <UpdateStudySession />
            },
            {
                path: 'payment/:id',
                element: <Payment />
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
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
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
            {
                path: 'create-note',
                element: <CreateNote />
            },
            {
                path: 'manage-notes',
                element: <ManageNotes />
            },
            {
                path: 'update-note/:id',
                element: <UpdateNote />
            },
            {
                path: 'student/all-materials',
                element: <StudentRoute>
                    <ViewAllStudyMaterials />
                </StudentRoute>
            },
            {
                path: 'student/session-materials/:id',
                element: <StudentRoute>
                    <ViewSessionMaterials />
                </StudentRoute>
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
            // admin related routes
            {
                path: 'admin/all-study-sessions',
                element: <AllStudySessionsAdmin />,
            },
            {
                path: 'admin/all-study-materials',
                element: <ViewAllMaterialsAdmin />,
            },
            {
                path: 'admin/manage-users',
                element: <ManageUsers />,
            },
        ]
    }
])