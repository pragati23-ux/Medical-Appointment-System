import React from 'react'
import {services} from './../../assets/data/services'
import ServiceCard from './ServiceCard'
const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-[20px] lg:mt-[40px] items-start justify-items-center">
    {services.map((item,index)=> <ServiceCard item ={item} index={index} key={index}/>)}
    </div>
  )
}

export default ServicesList