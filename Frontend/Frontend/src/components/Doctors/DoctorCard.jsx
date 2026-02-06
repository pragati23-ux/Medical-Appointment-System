import React from 'react'
import starIcon from '../../assets/images/Star(1).png' 
import {Link} from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs'
 

const DoctorCard = ({doctor}) => {
  const { 
    name, 
    avgRating, 
    totalRating, 
    photo, 
    specialization, 
    totalPatients, 
    hospital 
  } = doctor;
  return (
    <div className='doctor_card bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-300'> 
       <div className="w-full h-[260px] rounded-2xl overflow-hidden flex justify-center items-center">
  <img
    src={photo}
    alt={name}
    className="w-full h-full object-cover"
  />
</div>

        <h2 className="text-[20px] font-bold mt-4">
  {name}
</h2>

        <div className="flex items-center gap-2 mt-2">
          <img src={starIcon} alt="star" className="w-4 h-4"/>
          <span className="font-semibold">{avgRating}</span>
          <span className="text-sm text-gray-500">({totalRating})</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">{specialization} • {totalPatients} patients</div>
        <div className="text-sm text-gray-500 mt-1">{hospital}</div>
         <div className="flex justify-end mt-4">
  <Link to="/doctors">
    <BsArrowRight
      className="
        w-10 h-10
        p-2
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
  )
}

export default DoctorCard