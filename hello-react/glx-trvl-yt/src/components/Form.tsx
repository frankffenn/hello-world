import React from 'react'

const Form = () => {
  return (
    <div className='bg-black p-8'>
        <form className='flex flex-col max-w-[600px] mx-auto'>
            <label className='mb-2 text-[#eee]'>Your Name</label>
            <input className='mb-2 px-1 py-2 bg-neutral-600 border border-white/10 text-[#f4f4f4]' type="text" />
            <label className='mb-2 text-[#eee]'>Email</label>
            <input className='mb-2 px-1 py-2 bg-neutral-600 border border-white/10 text-[#f4f4f4]' type="text" />
            <label className='mb-2 text-[#eee]'>Subjects</label>
            <input className='mb-2 px-1 py-2 bg-neutral-600 border border-white/10 text-[#f4f4f4]' type="text" />
            <label className='mb-2 text-[#eee]'>Details</label>
            <textarea className='mb-4 px-1 py-2 bg-neutral-600 border border-white/10 text-[#f4f4f4]' name="" rows={6} placeholder='Type a short message here'></textarea>
            <button className='text-white border py-2 mt-4'>Submit</button>
        </form>
    </div>
  )
}

export default Form