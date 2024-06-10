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
import ErrorPage from "../pages/error/ErrorPage";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import Announcements from "../pages/Announcements/Announcements";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
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
                path: 'announcements',
                element: <Announcements />
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
                element: <StudentRoute>
                    <BookedSessions />
                </StudentRoute>
            },
            {
                path: 'booked-session-detail/:id',
                element: <StudentRoute>
                    <BookedSessionDetail />
                </StudentRoute>
            },
            {
                path: 'create-note',
                element: <StudentRoute>
                    <CreateNote />
                </StudentRoute>
            },
            {
                path: 'manage-notes',
                element: <StudentRoute>
                    <ManageNotes />
                </StudentRoute>
            },
            {
                path: 'update-note/:id',
                element: <StudentRoute>
                    <UpdateNote />
                </StudentRoute>
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
                element: <TutorRoute>
                    <TutorDashboard />
                </TutorRoute>
            },
            {
                path: 'create-study-session',
                element: <TutorRoute>
                    <CreateStudySession />
                </TutorRoute>
            },
            {
                path: 'all-study-sessions',
                element: <TutorRoute>
                    <AllStudySessions />
                </TutorRoute>
            },
            {
                path: 'tutor/all-study-sessions',
                element: <TutorRoute>
                    <TutorAllStudySessions />
                </TutorRoute>
            },
            {
                path: 'upload-materials',
                element: <TutorRoute>
                    <UploadMaterials />
                </TutorRoute>
            },
            {
                path: 'tutor/view-all-materials',
                element: <TutorRoute>
                    <AllMaterialsOfTutor />
                </TutorRoute>
            },
            {
                path: 'tutor/view-all-materials/:id',
                element: <TutorRoute>
                    <SessionsMaterial />
                </TutorRoute>
            },
            // admin related routes
            {
                path: 'admin',
                element: <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>,
            },
            {
                path: 'admin/all-study-sessions',
                element: <AdminRoute>
                    <AllStudySessionsAdmin />
                </AdminRoute>,
            },
            {
                path: 'admin/all-study-materials',
                element: <AdminRoute>
                    <ViewAllMaterialsAdmin />
                </AdminRoute>,
            },
            {
                path: 'admin/manage-users',
                element: <AdminRoute>
                    <ManageUsers />
                </AdminRoute>,
            },
        ]
    }
])