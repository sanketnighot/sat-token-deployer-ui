import React, { useState, useEffect } from 'react'
import '@/styles/globals.css'
import Footer from '@/components/Assets/Footer'
import Header from '@/components/Assets/Header'
import Mask from '@/components/Assets/Mask'

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 5300);
    });

    return (
        <>
            {!loading && <>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </>}
            {loading && <>
                <Mask />
            </>}

        </>
    )
}
