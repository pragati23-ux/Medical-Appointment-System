 import React, { useState } from "react";
import doctorImg from "../../assets/images/doctor-img01(1).png";
import starIcon from "../../assets/images/Star(1).png";

const DoctorsDetails = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
    <section className="bg-[#fdf7e7] min-h-screen py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8">

        {/* ===== TOP SECTION ===== */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* Doctor Image */}
          <div className="w-full md:w-1/4">
            <div className="rounded-xl overflow-hidden">
              <img
                src={doctorImg}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-3">
              Surgeon
            </span>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Muhibur Rahman
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <img src={starIcon} alt="star" className="w-4 h-4" />
              <span className="font-semibold text-gray-700">4.8</span>
              <span className="text-gray-500 text-sm">(272)</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dicta, alias! Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
          </div>

        </div>

        {/* ===== TABS ===== */}
        <div className="mt-10 border-b flex gap-8">
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 font-medium ${
              activeTab === "about"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`pb-3 font-medium ${
              activeTab === "feedback"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Feedback
          </button>
        </div>

        {/* ===== TAB CONTENT ===== */}
        <div className="mt-6">

          {activeTab === "about" && (
            <div className="text-gray-600 leading-relaxed">
              <p>
                Dr. Muhibur Rahman is a highly experienced surgeon with more
                than 10 years of experience. He has treated thousands of
                patients and is known for his patient-friendly approach.
              </p>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="text-gray-600">
              <p>⭐ Very professional and friendly doctor.</p>
              <p className="mt-2">⭐ Explained everything clearly.</p>
              <p className="mt-2">⭐ Highly recommended.</p>
            </div>
          )}

        </div>

      </div>

    </section>
    
    </>
  );
};

export default DoctorsDetails;
