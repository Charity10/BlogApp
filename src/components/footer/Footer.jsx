import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
A blog app to share your thoughts and ideas with the world. It is a platform to express yourself and connect with others. It is a place to show your creativity and share your passion for writing. It is a place to share your knowledge and learn from others. It is a place to inspire and be inspired. It is a place to make a difference. It is a place to be you. It is a place to be heard. It is a place to be seen. It is a place to be. It is a place to blog.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +234 *** **** ***</span>
          <span>YouTube: Uduakobong</span>
          <span>GitHub: Charity10</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Africa</span>
          <span>Country: Nigeria</span>
          <span>Current Location: Osun state</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer