import React from 'react'
import LightRays from '@/components/LightRays';
import Image from 'next/image';

const GKK = () => {
    return (
        <main>
            <div className='absolute inset-0 top-0'>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ff11"
                    raysSpeed={1}
                    lightSpread={0.3}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={0.1}
                    saturation={1}
                />
            </div>

            <section>
                <Image
                    src='/GKK.png'
                    alt='GKK Logo'
                    width={200}
                    height={200}
                    className='mx-auto mt-75 z-[-1]'
                />

                <div className='flex items-center justify-center'>
                    <h1 className='title text-7xl text-[#76ab85] z-[1] m-25 text-center'>Coming soon...</h1>
                </div>
            </section>

            <footer className='fixed bottom-0 w-full text-center p-4 bg-white bg-opacity-50'>
                <a href='/gkk/privacy' className='text-sm text-gray-700 hover:underline'>
                    Privacy Policy
                </a>
            </footer>

            {/* button to go to /gkk */}
            <div className='fixed bottom-5 right-5'>
                <a href='/' className='bg-[#76ab85] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#57ba73] transition font-light'>
                    Go to FI
                </a>
            </div>
        </main>
    )
}

export default GKK