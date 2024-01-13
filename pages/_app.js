import '@/styles/globals.css'
import Footer from '@/components/Assets/Footer'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Footer />

        </>
    )
}
