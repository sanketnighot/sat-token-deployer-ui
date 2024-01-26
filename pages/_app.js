import React from 'react'
import '@/styles/globals.css'
import Footer from '@/components/Assets/Footer'
import Header from '@/components/Assets/Header'

export default function App({ Component, pageProps }) {

    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>

    )
}
