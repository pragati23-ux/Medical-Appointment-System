import React from 'react'
import './Services.css'
import {services} from "../assets/data/services";
import ServiceCard from "../components/services/ServiceCard";

const Services = () => {
  return (
     <section className="services_section">
      <div className="container">
        <div className="big">
          {services.map((item,index) =>(
            <ServiceCard item={item} index={index} key={index}/>
          ))}
        </div>
      </div>
     </section>
  )
}

export default Services