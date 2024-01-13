import React from 'react';
import Head from 'next/head'
import AccordionComp from '../components/Assets/AccordionComp';
import Hero from '../components/Hero';

export default function Home() {
    return (
        <>
            <Head>
                <title>SATs Token Deployer</title>
                <meta property="og:title" content="SAT Token Deployer" />
                <meta property="og:description" content="Special Appreciation Token for Tezos Artist" />
                <meta property="og:site_name" content="SAT Token Deployer" />
            </Head>
            <div className="flex flex-wrap justify-center items-center mt-10">
                <div className="container md:w-4/6 w-6/6">
                    <Hero />
                </div>
                <div className="container min-h-24 md:w-4/6 w-6/6 p-8">
                    <AccordionComp />
                </div>
                <div className="flex-row justify-center pt-5 text-3xl mx-auto text-center mt-5 mb-10">
                    <h3>Co-created by <a className="text-extrabold underline" href="#" target="_blank">Natived</a> and <a href="#" target="_blank" className="text-extrabold underline">The Grand Quackster</a></h3>
                </div>

            </div>
        </>
    )
}
