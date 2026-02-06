import React from 'react'
import Aboutimg from '../../assets/images/about(1).png'
import {Link} from 'react-router-dom'
const About = () => {
  return (
     <section className="about-section py-[60px]">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:items-center">
    <div className="w-full lg:w-1/2 p-4 order-1 flex justify-center">
       <img
        src={Aboutimg}
        alt="Doctor"
        className="w-full max-w-[420px] rounded-lg object-cover shadow-lg"
      />
    </div>
    <div className="w-full lg:w-1/2 order-2 my-12 flex flex-col justify-center items-center text-center">
       <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 about-heading">
        Proud to be one of the nation's best
      </h2>
      <div className='about-copy max-w-[680px] mt-4'>
        <p className='text__para'>
        For 30 years in a row, U.S. News & World Report has recognized us
        as one of the best public hospitals in the Nation and #1 in
        Texas. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Quas, nemo?
      </p>
      <p className='text__para mt-20px'>
        Our best is something we strive for each day, caring for our
        patients—not looking back at what we accomplished but towards what
        we can do tomorrow. Providing the best. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Aliquid, modi?
      </p>
      <div className='mt-6'>
        <Link to='/'><button className="btn">learn more</button></Link>
      </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default About