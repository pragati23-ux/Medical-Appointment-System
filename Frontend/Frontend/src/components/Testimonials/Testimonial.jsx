import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import './Testimonial.css'
import patientAvatar from '../../assets/images/patient-avatar(1).png'
import { HiStar } from 'react-icons/hi'

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Muhibar Rahman',
      avatar: patientAvatar,
      text:
        'Excellent care and very friendly staff. The clinic was clean and the doctor explained everything clearly.'
    },
    {
      name: 'Anita Sharma',
      avatar: patientAvatar,
      text:
        'Quick appointments and professional service. Would recommend to family and friends.'
    },
    {
      name: 'Anita Sharma',
      avatar: patientAvatar,
      text:
        'Quick appointments and professional service. Would recommend to family and friends.'
    }
  ]

  return (
    <section className="testimonial-section">
      <Swiper
        className="testimonial-swiper"
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 12
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28
          }
        }}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src={t.avatar} alt={`${t.name} avatar`} />
              </div>

              <div className="testimonial-name">{t.name}</div>

              <div className="testimonial-stars" aria-hidden>
                <HiStar />
                <HiStar />
                <HiStar />
                <HiStar />
                <HiStar />
              </div>

              <div className="testimonial-text">{t.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonial