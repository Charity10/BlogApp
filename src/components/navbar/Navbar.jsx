'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import classes from './navbar.module.css'
import person from '../../../public/person.jpg'
import { AiOutlineClose } from 'react-icons/ai'
import {signIn, signOut, useSession} from 'next-auth/react'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()

  const handleShowDropdown = () => setShowDropdown(prev => true)

  const handleHideDropdown = () => setShowDropdown(prev => false)

  if (session && session.user) {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href="/">{session.user.name}</Link>
        </h2>
        <ul className={classes.right}>
                <div>
                  <Image onClick={handleShowDropdown} src={person} width='45' height='45' alt='person'/>
                  
                  {showDropdown && (
                    <div className={classes.dropdown}>
                      <AiOutlineClose className={classes.closeIcon} onClick={handleHideDropdown} />
                      <button onClick={() => {signOut(); handleHideDropdown()}} className={classes.logout}>Logout</button>
                      <Link onClick={handleHideDropdown} href='/create-blog' className={classes.create}>Create</Link>
                    </div>
                  )}
                </div>
                </ul>
                </div>
                </div>
              ); 
              } 
              return (
                <>
                  <button onClick={() => {signIn()}} className={classes.login}>Log in</button>
                  <Link href='/register'>Register</Link>
                </>
              )
          
}

export default Navbar