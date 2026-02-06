const DoctorAbout = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      {/* About */}
      <div>
        <h3 className="text-[22px] font-semibold text-headingColor">
          About
        </h3>

        <p className="text__para mt-4">
          Dr. Muhibur Rahman is a highly experienced surgeon with over a decade
          of professional expertise. He is known for his patient-centered
          approach, advanced surgical skills, and dedication to medical
          excellence.
        </p>
      </div>

      {/* Education */}
      <div className="mt-12">
        <h3 className="text-[20px] font-semibold text-headingColor">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-4">
            <div>
              <span className="text-irisBlueColor text-[15px] font-semibold">
                23 June, 2008
              </span>
              <p className="text-[16px] font-medium text-textColor">
                PHD in Surgery
              </p>
            </div>

            <p className="text-[14px] font-medium text-textColor">
              Dhaka Medical College, Bangladesh
            </p>
          </li>

          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5">
            <div>
              <span className="text-irisBlueColor text-[15px] font-semibold">
                15 May, 2003
              </span>
              <p className="text-[16px] font-medium text-textColor">
                MBBS
              </p>
            </div>

            <p className="text-[14px] font-medium text-textColor">
              Chittagong Medical College
            </p>
          </li>
        </ul>
      </div>

      {/* Experience */}
      <div className="mt-12">
        <h3 className="text-[20px] font-semibold text-headingColor">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-6 pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] font-semibold">
              2014 - Present
            </span>
            <p className="text-[16px] font-medium text-textColor mt-1">
              Senior Surgeon
            </p>
            <p className="text-[14px] text-textColor">
              Apollo Hospital
            </p>
          </li>

          <li className="p-4 rounded bg-[#e5f8f3]">
            <span className="text-irisBlueColor text-[15px] font-semibold">
              2009 - 2014
            </span>
            <p className="text-[16px] font-medium text-textColor mt-1">
              Consultant Surgeon
            </p>
            <p className="text-[14px] text-textColor">
              Square Hospital
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DoctorAbout;
