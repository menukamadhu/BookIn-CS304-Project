import React, { useState } from 'react'
import Welcome from '../Assets/Welcome.jpg'
import Logo from '../Assets/Logo.png'
import Button from '../Components/Button'
import RegisterModal from '../Components/RegisterModal'
import { Link } from 'react-router-dom'

const Login = () => {
    const [ShowModal,setShowModal] = useState(false);
    const handleOnClose = () => setShowModal(false);
  return (
    <div>
      <div className='relative flex bg-white md:flex-col-reverse'>
        <section name='Welcome' className=''>
            <div className="relative h-screen md:w-2/3 hero">
                <img src={Welcome} alt="" className='hidden object-fill w-full h-full md:block' />
            <div className="bg-opacity-70 hero-overlay"></div>
            <div className='absolute cursor-pointer top-5 left-20'>
                    <Link to="/"><a><img className='h-24' src={Logo} alt="" /></a></Link>
                </div>
            <div className="absolute left-20 bottom-32">
                <h1 className="mb-5 text-white text-7xl">Welcome to BookIn</h1>
                <p className="mb-5 text-2xl text-white">The Smartest Salon Scheduling Software of its kind.</p>
            </div>
                    <div className="absolute hidden grid-flow-col gap-8 bottom-10 md:grid">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16" className='duration-300 cursor-pointer hover:scale-110'>
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16" className='duration-300 cursor-pointer hover:scale-110'>
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="duration-300 cursor-pointer fill-current hover:scale-110"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="duration-300 cursor-pointer fill-current hover:scale-110"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="duration-300 cursor-pointer fill-current hover:scale-110"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
            </div>
            </div>
        </section>
        <section name='Login'>
            <div className='absolute top-0 flex flex-col justify-between w-full h-full p-20 py-32 bg-white md:w-1/3 md:left-2/3'>   
                <div className='flex flex-col'>
                    <h2 class="text-5xl font-bold text-blue-800">Login</h2>
                    <p class="mt-4 text-sm text-blue-600">If you already a member, easily log in</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <form action="" class="flex flex-col gap-4 w-full">
                    <input class="p-2 mt-8 border-2 bg-white border-gray-300" type="email" name="email" placeholder="email" />
                    <div class="relative">
                        <input class="w-full p-2 border-2 bg-white border-gray-300" type="password" name="password" placeholder="password" /> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="absolute duration-300 bi bi-eye top-1/3 right-3 hover:scale-110 cursor-pointer" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </div>
                </form>
                <div className='pt-8'>
                        <Button>Login</Button>
                    </div>
                </div>
                <div class="grid items-center grid-cols-5 text-gray-500">
                    <hr class="border-gray-400" />
                    <hr class="border-gray-400" />
                    <p class="text-center">OR</p>
                    <hr class="border-gray-400" />
                    <hr class="border-gray-400" />
                </div>
                <div>
                    <button className="w-full px-8 text-sm text-gray-600 btn btn-outline">
                    <svg class="mr-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25px" height="25px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    Login with Google
                    </button>
                </div>
                <div class="py-4 border-b border-gray-400">
                    <a class="text-sm text-blue-700 hover:underline" href="">Forgot your password?</a>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <p className='text-sm text-gray-600'>Don't have an account?</p>
                    <button className="px-8 text-sm text-gray-600 btn btn-outline" onClick={() => setShowModal(true)}>Register</button>
                </div>
            </div>
        </section>
        <RegisterModal visible={ShowModal} OnClose={handleOnClose}/>
      </div>
    </div>
  )
}

export default Login
