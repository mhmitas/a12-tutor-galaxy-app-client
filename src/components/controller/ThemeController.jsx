import React, { useContext, useEffect, useState } from 'react';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const ThemeController = () => {
    const [theme, setTheme] = useState(null)

    const html = document.querySelector('html')

    useEffect(() => {
        const localTheme = localStorage.getItem('color-theme')
        if (localTheme) {
            setTheme(localTheme)
        } else {
            setTheme('lightTheme')
        }
    }, [])

    function handleTheme() {
        if (theme === 'lightTheme') {
            setTheme('darkTheme')
            localStorage.setItem('color-theme', 'darkTheme')
        } else {
            setTheme('lightTheme')
            localStorage.setItem('color-theme', 'lightTheme')
        }
    }

    useEffect(() => {
        html.setAttribute('data-theme', theme)
    }, [theme])
    return (
        <div>
            <button className='btn btn-circle btn-ghost' onClick={handleTheme} >
                {theme === 'darkTheme' ? <IoMoonOutline className='text-base-content' size={20} /> : <IoSunnyOutline className='text-base-content' size={20} />}
            </button >
        </div>
    );
};

export default ThemeController;