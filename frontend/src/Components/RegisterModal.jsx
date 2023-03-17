import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Button';

const RegisterModal = ({visible,OnClose}) => {
    const handleOnClose = (e) => {if(e.target.id === "container") OnClose()};
    if(!visible) return null;
  return (
    <div id='container' className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm' onClick={handleOnClose}> 
      <div className='py-6 bg-white px-14'>
        <div className='p-4'>
            <Link to="/SalonRegister">
                <Button>Register as a Salon</Button>
            </Link>
        </div>
        <div class="grid items-center grid-cols-5 text-gray-500">
                    <hr class="border-gray-400" />
                    <hr class="border-gray-400" />
                    <p class="text-center">OR</p>
                    <hr class="border-gray-400" />
                    <hr class="border-gray-400" />
                </div>
        <div className='p-4'>
            <Link to="/ClientRegister">
                <Button>Register as a Client</Button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
