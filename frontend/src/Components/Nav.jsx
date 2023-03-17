import React, { useEffect, useState } from 'react';
import Logo from '../Assets/Logo.png';
import Button from './Button';
import RegisterModal from './RegisterModal';
import { Link } from 'react-router-dom';

const Nav = () => {
   let Links = [
        {name:"Home",link:"/"},
        {name:"Services",link:"/"},
        {name:"Contact",link:"/"},
    ];
    const [open,setOpen]=useState(false); 
    useEffect(()=>{
        console.log(open)
    },[open])
    const [ShowModal,setShowModal] = useState(false);
    const handleOnClose = () => setShowModal(false);

  return (
    <div className='sticky top-0 left-0 z-50 w-full bg-slate-100'>
      <div className='items-center justify-between py-2 md:flex md:px-72 px-7'>
        <div className='cursor-pointer'>
            <span className=''>
                <Link to="/"><a><img className='h-24' src={Logo} alt="" /></a></Link>
            </span>
        </div>
        <div>
            <div className='absolute cursor-pointer right-8 top-7 md:hidden'  >
                <label className="swap swap-rotate">
                {/* <!-- this hidden checkbox controls the state --> */}
                <input type="checkbox"/>
                {/* <!-- hamburger icon --> */}
                <svg onClick={()=>setOpen((val) => !val)} className="swap-off fill-gray-800" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                {/* <!-- close icon --> */}
                <svg onClick={()=>setOpen((val) => !val)} className="swap-on fill-gray-800" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                </label>
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-300 ease-in ${open ? 'block':'hidden'} `}>
                {
                    Links.map((link)=>(
                        <li key={link.name} className='text-xl md:ml-8 md:my-0 my-7'>
                            <a href={link.link} className='text-gray-800 duration-300 hover:text-gray-500'>{link.name}</a>
                        </li>
                    ))
                }
                <div className='pb-8 pl-0 md:pb-0 md:pl-10'>
                    <button className="px-4 text-sm text-gray-600 btn btn-outline" onClick={() => setShowModal(true)}>Register</button>
                </div>
                <div className='pl-0 md:pl-10'>
                    <Link to="/Login">
                        <Button>
                            Login
                        </Button>
                    </Link>
                </div>
            </ul>
        </div>
        <RegisterModal visible={ShowModal} OnClose={handleOnClose}/>
      </div>
    </div>
  )
}

export default Nav
