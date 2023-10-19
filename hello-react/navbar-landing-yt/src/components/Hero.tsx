import React from 'react'
import { FaDatabase, FaAsterisk, FaAccusoft, FaFacebook, FaTwitter, FaGithub, FaGit } from 'react-icons/fa'


// * :root {
//   --primary: #6948ff;
//   --secondary: #553bcb;
//   --darkgrey: #22262a;
//   --lightgrey: #d3d3d3;
//   --grey: #808080;
//   --white: #f8f8f8;
// }
 
const Hero = () => {
  return (
    <div className='w-full h-screen bg-[#22262a]'>
        <div className='max-w-[1240px] py-2 mx-auto'>
            <div className='w-full md:grid md:grid-cols-2'>
                <div className='mx-4 p-2 flex flex-col justify-center h-[70vh]'>
                    <div>
                        <h1 className='text-4xl md:text-5xl font-bold text-white'> Data to enrich your</h1>
                        <h1 className='text-[#00df9a] text-3xl'>online business</h1>
                        <p className='mt-4 leading-6 text-[#d3d3d3]'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <div className=''>
                        <p className='mt-4 text-sm text-[#d3d3d3]'>USERD BY</p>
                        <div className='flex items-center text-[#d3d3d3]'>
                            <FaDatabase size={20} /> <span className='p-4'>Database</span>
                            <FaAsterisk size={20} /> <span className='p-4'>Asterisk</span>
                            <FaAccusoft size={20} /> <span className='p-4'>Accusoft</span>
                        </div>
                    </div>
                </div>
                <div className='p-4 h-[70vh] flex-col justify-center items-center hidden md:flex'>
                    <div className='w-[400px] mx-auto bg-white rounded-md px-4 py-2'>
                        <div className='p-4'>
                            <p className='text-[#808080] mb-2'>Sign in with</p>
                            <div className='flex flex-row justify-center'>
                                <span className='bg-white px-12 py-2 rounded border'><FaFacebook size={20} /></span>
                                <span className='bg-white px-12 py-2 rounded border'><FaTwitter size={20} /></span>
                                <span className='bg-white px-12 py-2 rounded border'><FaGithub size={20} /></span>
                            </div>
                        </div>
                        
                        <div>
                            <p className='text-[#808080] w-full text-center leading-3 border-b my-2'>
                                <span className='bg-white px-4'>Or</span>
                            </p>
                        </div>

                        <form action="">
                            <input className='block w-full py-2 px-4 mt-4 border-b bg-white rounded' type="text" name="Name" placeholder='Name' />
                            <input className='block w-full py-2 px-4 border-b bg-white rounded' type="text" name="Email" placeholder="Email" />
                            <input className='block w-full py-2 px-4 border-b bg-white rounded' type="password" name="Password" placeholder="Password" />
                            <button className='w-full mt-4 px-4 py-2 rounded-md bg-[#00df9a] cursor border text-white hover:bg-[#00df7a]'>Create Your Account</button>
                        </form>
                        <div>
                            <p className='text-[#808080] px-2 py-4 text-sm border-t mt-4'>By signing up, you agree to our
                                <span className='text-[#00df9a] font-bold'> Tearms, Data Policy</span> and 
                                <span className='text-[#00df9a] font-bold'> Cookies Policy</span>.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero