import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'
import logo from '../../assets/images/logo(2).png'

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up real subscription endpoint
    alert('Thanks for subscribing!')
  }

  return (
    <footer className="site-footer bg-gray-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-brand">
          <img src={logo} alt="Medicare logo" className="w-28 mb-4" />
          <p className="text-sm text-gray-600">World-class care for everyone. Our health system offers unmatched, expert health care.</p>
          <div className="social mt-4 flex gap-3">
            <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-links md:col-span-1 flex gap-6">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><a href="#">Primary Care</a></li>
              <li><a href="#">Telemedicine</a></li>
              <li><a href="#">Urgent Care</a></li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="newsletter md:col-span-1">
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-3">Subscribe for updates, latest news and offers.</p>

          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
            <input type="email" required placeholder="Your email" className="input-email flex-1" />
            <button className="btn-subscribe">Subscribe</button>
          </form>

          <div className="contact text-sm text-gray-600 mt-4">
            <div>Call us: <a href="tel:+1234567890" className="text-gray-800">+1 (234) 567-890</a></div>
            <div className="mt-1">Email: <a href="mailto:info@medicare.com" className="text-gray-800">info@medicare.com</a></div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Medicare. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer