import React from 'react'
import { FaFacebook, FaLinkedin, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='max-w-screen mx-auto h-full text-white bg-black/80 p-4'>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          <div className='p-4'>
            <div className='flex mb-2 items-center'>
              <span><FaSearchLocation size={20}></FaSearchLocation></span>
              <div className='mx-4'>
                <p>123 Acme St.</p>
                <h4>Houston, Tx</h4>
              </div>
            </div>
            <div className='flex mb-2 items-center'>
              <span><FaPhone size={20}></FaPhone></span>
              <h4 className='mx-4'>1-800-123-1234</h4>
            </div>
            <div className='flex mb-2 items-center'>
              <span><FaMailBulk size={20}></FaMailBulk></span>
              <h4 className='mx-4'>exampe@gmail.com</h4>
            </div>
          </div>
          <div className='p-4'>
            <h4 className='text-2xl font-bold mb-4'>About the company</h4>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className='flex my-4 justify-center'>
              <span className='mx-2'><FaFacebook size={20}></FaFacebook></span>
              <span className='mx-2'><FaTwitter size={20}></FaTwitter></span>
              <span className='mx-2'><FaLinkedin size={20}></FaLinkedin></span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Footer