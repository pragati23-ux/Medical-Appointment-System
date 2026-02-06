import React from 'react'
import './Home.css'
import About from "../components/About/About"
import heroimg from '../assets/images/hero-img01(1).png'
import icon01 from '../assets/images/icon01(1).png'
import icon02 from '../assets/images/icon02(1).png'
import icon03 from '../assets/images/icon03(1).png'
import faqimage from '../assets/images/faq-img(1).png'
import featureImg from '../assets/images/feature-img(1).png'
import {Link} from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import ServicesList from '../components/services/ServicesList'
import DoctorList from '../components/Doctors/DoctorList'
import FaqList from '../components/Faq/FaqList'
import Testimonial from '../components/Testimonials/Testimonial'
const Home = () => {
  return (
    <>
    {/* ===== hero section ===== */}
<section className="hero_section pt-[60px] 2xl:h-[800px]">
    <div className="container w-full">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between w-full">
            {/* ===== hero content ==== */}
            <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor md:text-[60px] md:leading-[70px] font-bold mx-10 my-4">
                    We help patients live a healthy, longer life.
                </h1>

                <p className="text__para mx-10 my-4 font-thin">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Natus quaerat cumque fugit, perspiciatis cum nemo aperiam,
                    aut quia earum amet architecto, modi odio. Soluta unde
                    ducimus perferendis?
                </p>
                <button className="btn">Request an Appointment</button>
            </div>
            {/* Hero image */}
            <div className="hidden lg:flex flex-1 justify-end">
              <img src={heroimg} alt="Hero" className="w-full max-w-[400px] h-auto"/>
            </div>
        </div>
    </div>
</section>
{/* Hero Counter */}
<div className="leo">
<div className="ml-26 mb-2 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px] ">

  <div>
    <h2 className="text-[36px] leading-14 lg:text-[44px] lg:leading-[54px] font-bold text-headingColor">
      30+
    </h2>
    <span className="w-[100px] h-2 bg-blue-600 rounded-full block -mt-3.5"></span>
    <p className="text__para">Years of Experience</p>
  </div>

  <div>
    <h2 className="text-[36px] leading-14 lg:text-[44px] lg:leading-[54px] font-bold text-headingColor">
      15+
    </h2>
    <span className="w-[100px] h-2 bg-purple-600 rounded-full block -mt-3.5"></span>
    <p className="text__para">Clinic Location</p>
  </div>
  <div>
    <h2 className="text-[36px] leading-14 lg:text-[44px] lg:leading-[54px] font-bold text-headingColor">
      100%
    </h2>
    <span className="w-[100px] h-2 bg-amber-400 rounded-full block -mt-3.5"></span>
    <p className="text__para">Patient Satisfaction</p> </div>
</div>
</div>
<section>
  <div className="container1">
    <div className='font w-[680px] mx-auto'>
      <h1 className='text-center'>Providing the best medical services.</h1>
    </div>
  </div>
  <p className='text-center m-7'>
    World class care for everyone. Our health care system offers unmatched,expert health care.
  </p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
  <div className="py-[30px] px-5">
    {/* IMAGE CENTER */}
    <div className="flex items-center justify-center">
      <img src={icon01} alt="" />
    </div>
    {/* TEXT SECTION */}
    <div className="mt-[30px]">
      <h2 className="text-[26px] leading-9 text-headingColor font-700 text-center">
        Find a Doctor
      </h2>
      <p className="text-[16px] leading-7 text-textColor font-400 mt-4 text-center">
        World-class care for everyone. Our health system offers 
        unmatched, expert health care. From the lab to the clinic.
      </p>
    </div>
    {/* ARROW BUTTON */}
    <Link
      to="/doctors"
      className=""
    >
      <BsArrowRight
  className="
    w-10 h-10
    p-2 
    m-8
    mx-50
    rounded-full 
    bg-gray-200 
    hover:bg-blue-500 
    hover:text-white 
    transition-all 
    duration-300
  "
/>

       
    </Link>

  </div>
  <div className="py-[30px] px-5">
    
    {/* IMAGE CENTER */}
    <div className="flex items-center justify-center">
      <img src={icon02} alt="" />
    </div>

    {/* TEXT SECTION */}
    <div className="mt-[30px]">
      <h2 className="text-[26px] leading-9 text-headingColor font-700 text-center">
        Find a Location
      </h2>

      <p className="text-[16px] leading-7 text-textColor font-400 mt-4 text-center">
        World-class care for everyone. Our health system offers 
        unmatched, expert health care. From the lab to the clinic.
      </p>
    </div>

    {/* ARROW BUTTON */}
    <Link
      to="/doctors"
      className="
      "
    >
     <BsArrowRight
  className="
    w-10 h-10
    p-2 
    m-8
    mx-50
    rounded-full 
    bg-gray-200 
    hover:bg-blue-500 
    hover:text-white 
    transition-all 
    duration-300
  "
/>

    </Link>

  </div>
  <div className="py-[30px] px-5">
    
    {/* IMAGE CENTER */}
    <div className="flex items-center justify-center">
      <img src={icon03} alt="" />
    </div>

    {/* TEXT SECTION */}
    <div className="mt-[30px]">
      <h2 className="text-[26px] leading-9 text-headingColor font-700 text-center">
        Book Appointment
      </h2>

      <p className="text-[16px] leading-7 text-textColor font-400 mt-4 text-center">
        World-class care for everyone. Our health system offers 
        unmatched, expert health care. From the lab to the clinic.
      </p>
    </div>

    {/* ARROW BUTTON */}
    <Link
      to="/doctors"
      className="
        
      "
    >
       <BsArrowRight
  className="
    w-10 h-10
    p-2 
    m-8
    mx-50
    rounded-full 
    bg-gray-200 
    hover:bg-blue-500 
    hover:text-white 
    transition-all 
    duration-300
  "
/>

    </Link>

  </div>

</div>

</section>
<About />
<section className="services-section py-[60px]">
  <div className="container">
    <div className="services-header text-center">
      <h2 className="text-[32px] md:text-[36px] font-bold text-center">Our Medical Services</h2>
      <p className='services-subtext max-w-[720px] mx-auto mt-2 text-[16px] text-textColor text-center'>
        World-class care for everyone. Our health system offers unmatched, expert healthcare across specialties.
      </p>
      <div className="mt-4 text-center">
        <Link to="/services" className="btn btn-outline">View All Services</Link>
      </div>
    </div>
    <div className="services-list-wrapper mt-6 mx-auto max-w-[1100px]">
      <ServicesList/>
    </div>
  </div>
</section>
<section>
  <div className="container">
    <div className='feature-row flex items-center justify-between flex-col lg:flex-row'>
      <div className='feature-text'>
        <h2 className="heading feature-heading">Get Virtual Treatment</h2>
        <h3 className="feature-subheading">anytime.</h3>
        <div className='feature-copy'>
          <ul className='geo'>
            <li>
              1. Schedule the appointment directly.
            </li>
            <li>
              2. Search for your physician here and contact their office.
            </li>
            <li>
              3. View our physicians who are accepting new patients and use the online scheduling tool to select an appointment time.
            </li>
          </ul>
        </div>
        <Link to='/' className='mx-auto'>
          <button className='btn mt-6 mx-auto'>
            learn more
          </button>
        </Link>
      </div>
      <div className="feature-img relative z-10 flex justify-center mt-[30px] lg:mt-0">
        <img src={featureImg} className='w-full max-w-[520px] rounded-lg object-cover'/>
      </div>
    </div>
  </div>
</section>
<section>
  <div className='pet'>
     <h1 className='het'>Our Great Doctors</h1>
     <p className='jet'> World Class Care for Everyone. Our Health System Offers Unmatched,experts healthcare.</p>
  </div>
  <DoctorList/>
</section>
<section>
  <div className="container">
    <div className='flex justify-between'> 
    <div className='w=1/2'>
      <img src={faqimage}/>
    </div>
    <div className='w-full md:w-1/2'>
    <h2 className='heading'>Most questions by our beloved patients</h2>
    <FaqList/>

    </div>
  </div>
  </div>
</section>
 <section>
  <div className='pet'>
     <h1 className='het'>What are patients says?</h1>
     <p className='jet'> World Class Care for Everyone. Our Health System Offers Unmatched,experts healthcare.</p>
     <Testimonial/>
  </div>
   
</section>

</>

  )
}

export default Home
