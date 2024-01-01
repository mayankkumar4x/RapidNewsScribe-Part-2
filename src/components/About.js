import React, { useContext, useEffect } from 'react'
export default function About() {

  return (
    <div className='container'>
      <div>
        <h4>About iNotebook</h4>
        <p style={{textAlign: 'justify'  }}>Welcome to iNotebook, your go-to solution for efficient note-taking! iNotebook is a user-friendly and feature-rich application designed to simplify the process of creating, editing, and managing your notes. With a seamless login and signup process, our platform ensures a personalized and secure experience for every user.</p>
      </div>
      <div>
        <h4>Key Features:</h4>
        <div>
          <b style={{ display: 'inline-block' }}>Create: </b>
          <p style={{ display: 'inline-block' }}> Effortlessly jot down your thoughts, ideas, and important information in a matter of seconds.</p>
        </div>
        <div>
          <b style={{ display: 'inline-block' }}>Edit: </b>
          <p style={{ display: 'inline-block' }}> Update your notes with ease.</p>
        </div>
        <div>
          <b style={{ display: 'inline-block' }}>Delete: </b>
          <p style={{ display: 'inline-block' }}> Streamline your workspace by removing unnecessary notes effortlessly.</p>
        </div>
        <div>
          <b style={{ display: 'inline-block' }}>Secure Login: </b>
          <p style={{ display: 'inline-block' }}>  Protect your data with a robust login system, ensuring your notes are for your eyes only.</p>
        </div>
        <div>
          <b style={{ display: 'inline-block' }}>Sign Up: </b>
          <p style={{ display: 'inline-block' }}> Join our community with a simple and quick sign-up process, start to use iNotebook</p>
        </div>
      </div>
      <div>
        <p>iNotebook is not just a note-taking app; it's a companion that adapts to your needs. Whether you're a student, professional, or creative individual, our platform is designed to enhance your productivity and keep your thoughts organized.</p>
        <br />

      </div>
      <span>Thank you for choosing iNotebook to be a part of your note-taking journey!</span>
    </div>
  )
}
