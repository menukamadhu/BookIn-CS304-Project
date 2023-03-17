import React from 'react'
import Logo from '../Assets/Logo.png'
import Modal from '../Assets/Modal.jpg'
import Button from './Button'
import { Link } from 'react-router-dom'

const SuccessfulModal = ({visible}) => {
    // console.log(visible)
    if(!visible) return null;
  return (
    <>
      {visible &&
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm'>
        <div className='flex flex-col bg-white rounded-xl'>
          <div className='relative'>
              <img src={Modal} alt="" className='w-96 rounded-t-xl'/>
          </div>
          <div className='flex flex-col items-center justify-center'>
              <svg fill="none" stroke="blue" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="50" height="50">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
              <h1 className='text-2xl text-black'>Congratulations!</h1>
              <p className='pt-2 text-black'>You've successfully registered for BookIn.</p>
          </div>
          <div className='flex flex-col items-end p-4'>
              <Link to="/Login"><Button>Ok</Button></Link>
          </div>
        </div>
      </div>}
    </>
  )
}

export default SuccessfulModal
