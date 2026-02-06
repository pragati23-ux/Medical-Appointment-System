   import React from "react";
import DoctorList from "../../components/Doctors/DoctorList";
import Testimonials from "../../components/Testimonials/Testimonial";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";

const Doctors = () => {
  return (
    <section className="bg-[#fdf7e7] min-h-screen">

      {/* ===== SEARCH SECTION ===== */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Find a Doctor
          </h1>

          {/* Search Box */}
          <div className="flex justify-center">
            <div className="flex w-full max-w-xl bg-white rounded-lg shadow-sm overflow-hidden">

              <input
                type="text"
                placeholder="Search Doctor"
                className="
                  flex-1
                  px-5
                  py-3
                  text-gray-700
                  focus:outline-none
                "
              />

              <button
                className="
                  px-8
                  bg-blue-600
                  text-white
                  font-medium
                  hover:bg-blue-700
                  transition
                "
              >
                Search
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* ===== DOCTOR LIST ===== */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <DoctorList />
        </div>
      </div>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Doctor About Section */}
      <div className="container mx-auto px-4 py-16">
        <DoctorAbout />
      </div>
      
      {/* Feedback Section */}
      <div className="container mx-auto px-4 py-16">
        <Feedback />
      </div>
      
    </section>
     
      
  );
};

export default Doctors;
