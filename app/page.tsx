import React from 'react'
import LightRays from '@/components/LightRays';

const Home = () => {
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
        <img src='/FI_Logo.png' alt='Fazal-e-Insaaniyat Logo' className='mx-auto mt-50 w-100 h-100 z-[-1]'/>

        <div className='flex items-center justify-center'>
          <h1 className='title text-7xl text-[#76ab85] z-[1] text-center'>Coming soon...</h1>
        </div>
      </section>

      {/* button to go to /gkk */}
      <div className='fixed bottom-5 right-5'>
        <a href='/gkk' className='bg-[#76ab85] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#57ba73] transition font-light'>
          Go to GKK
        </a>
      </div>
    </main>
  )
}

export default Home