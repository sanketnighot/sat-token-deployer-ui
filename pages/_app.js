import React, { useState, useEffect } from 'react'
import '@/styles/globals.css'
import Footer from '@/components/Assets/Footer'
import Header from '@/components/Assets/Header'
import Loader from '@/components/Assets/Loader'

export default function App({ Component, pageProps }) {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsAnimating(false);
        }, 5500); // Duration should match the CSS animation
    });


    return (
        <>
            {!isAnimating && <><Header />
                <Component {...pageProps} />
                <Footer /></>}
            {isAnimating && <Loader />}

        </>
    )
}
