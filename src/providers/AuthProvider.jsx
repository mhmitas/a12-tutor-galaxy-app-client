import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth"
import { app } from '../firebase/firebase.config';
import axios from 'axios'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true);

    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function updateUserProfile(name = null, photo = null) {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    function signInWithProvider(provider) {
        return signInWithPopup(auth, provider)
    }
    function signOutUser() {
        return signOut(auth)
    }

    // get token from function
    const getToken = async (user) => {
        const { data } = await axios.post(`${import.meta.env.VITE_URL}/jwt`, user)
        localStorage.setItem('access-token', data.token)
        return data
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthLoading(false)
            setUser(currentUser)
            // console.log('currentUser =>', currentUser);
            if (currentUser) {
                const user = { email: currentUser?.email, uid: currentUser?.uid };
                getToken(user)
            }
        })
        return () => subscribe()
    }, [])

    const authInfo = {
        user,
        setUser,
        authLoading,
        setAuthLoading,
        createUser,
        signIn,
        updateUserProfile,
        signInWithProvider,
        signOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;