import React from 'react' 
import {doctors} from './../../assets/data/doctors'
import DoctorCard from './DoctorCard'

const DoctorList = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}

export default DoctorList