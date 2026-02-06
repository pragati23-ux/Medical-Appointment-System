import React, { useContext } from 'react'
import logo from "../../assets/images/logo(2).png"
 import UserImg from "../../assets/images/avatar-icon(1).png"
import { NavLink,Link } from 'react-router-dom'
import {BiMenu} from 'react-icons/bi'
import  './Header.css'
import { useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import UserMenu from '../UserMenu'
const navLinks =[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctors',
    display:'Find a Doctor'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path:'/contact',
    display:'Contact'
  },

]

const Header = () => {
  const menuRef = useRef(null)
  const { user } = useContext(AuthContext)

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')


  return (
    <>
      <header className="header flex items-center">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="logo"/>
            </div>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {
                  navLinks.map((link,index)=><li key={index}>
                    <NavLink to={link.path} className={navClass => navClass.isActive ?'text-primaryColor text-[16px] leading-7':'text-shadow-cyan-300' }>{link.display}
                    </NavLink>
                    </li>
                  )
                }
              </ul>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <div>
                    <Link to='/'>
                      <figure className="w">
                        <img src={UserImg} alt='user'/>
                      </figure>
                    </Link> 
                  </div>
                  <Link to='/login'>
                    <button className='bg-blue-400 px-4 py-2 text-white font-semibold h-11 flex items-center justify-center rounded-md w-auto'>
                      Login
                    </button>
                  </Link>
                </>
              )}
              
              <span className='md:hidden' onClick={toggleMenu}>
                <BiMenu className="w-6 h-6 cursor-pointer"/>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header