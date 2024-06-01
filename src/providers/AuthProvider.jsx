import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth"
import { app } from '../firebase/firebase.config';


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
    function signOutUser() {
        return signOut(auth)
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthLoading(false)
            setUser(currentUser)
            console.log('currentUser =>', currentUser);
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
        signOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;