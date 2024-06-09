import { createBrowserRouter, } from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/home/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import Dashboard from "../layouts/Dashboard";
import CreateStudySession from "../pages/Dashboard/tutor/CreateStudySession";
import SessionDetail from "../pages/session-detail/SessionDetail";
import AllStudySessions from "../pages/Dashboard/tutor/AllStudySessions";
import UploadMaterials from "../pages/Dashboard/tutor/UploadMaterials";
import BookedSessions from "../pages/Dashboard/student/BookedSessions";
import BookedSessionDetail from "../pages/Dashboard/student/BookedSessionDetail";
import CreateNote from "../pages/Dashboard/student/CreateNote";
import ManageNotes from "../pages/Dashboard/student/ManageNotes";
import UpdateNote from "../pages/Dashboard/student/UpdateNote";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import AllStudySessionsAdmin from "../pages/Dashboard/admin/AllStudySessionsAdmin";
import UpdateStudySession from "../pages/Dashboard/shared/UpdateStudySession";
import ViewAllMaterialsAdmin from "../pages/Dashboard/admin/ViewAllMaterialsAdmin";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import Payment from "../pages/payment/Payment";
import AllMaterialsOfTutor from "../pages/Dashboard/tutor/AllMaterialsOfTutor";
import SessionsMaterial from "../pages/Dashboard/tutor/materials-session";
import StudentSessionMaterialsTable from "../pages/Dashboard/student/StudentSessionMaterialsTable";
import StudentSessionMaterials from "../pages/Dashboard/student/StudentSessionMaterials";
import AllSessions from "../pages/all-sessions/AllSessions";
import Profile from "../pages/Dashboard/shared/Profile";
import TutorDashboard from "../pages/Dashboard/tutor/TutorDashboard";
import TutorAllStudySessions from "../pages/Dashboard/tutor/TutorAllStudySessions";

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
                element: <PrivateRoute>
                    <Payment />
                </PrivateRoute>
            },
            {
                path: 'all-sessions',
                element: <AllSessions />
            },
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
            {
                path: 'profile',
                element: <Profile />
            },
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
                path: 'student/session-materials',
                element: <StudentRoute>
                    <StudentSessionMaterialsTable />
                </StudentRoute>
            },
            {
                path: 'student/session-materials1/:id',
                element: <StudentRoute>
                    <StudentSessionMaterials />
                </StudentRoute>
            },
            // tutor related routes
            {
                path: 'tutor',
                element: <TutorDashboard />
            },
            {
                path: 'create-study-session',
                element: <CreateStudySession />
            },
            {
                path: 'all-study-sessions',
                element: <AllStudySessions />
            },
            {
                path: 'tutor/all-study-sessions',
                element: <TutorAllStudySessions />
            },
            {
                path: 'upload-materials',
                element: <UploadMaterials />
            },
            {
                path: 'tutor/view-all-materials',
                element: <AllMaterialsOfTutor />
            },
            {
                path: 'tutor/view-all-materials/:id',
                element: <SessionsMaterial />
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