import React from 'react'
import { Link } from 'react-router-dom'

const PricingCards = () => {
  return (
    <div>
        <div className='bg-black text-[#eee] grid md:grid-cols-3 grid-cols-1 gap-2'>
            <div className='m-8 p-4 border border-[#eee] rounded text-center hover:bg-[#141414]'>
                <h3 className='text-xl font-bold my-2'>- Basic -</h3>
                <div className='border-b w-[10%] max-w-full mx-auto my-2'></div>
                <p className='text-4xl font-bold my-2'>1 BTC</p>
                <p className='my-2'>- 3 Days -</p>
                <p className='my-2'>- Views -</p>
                <p className='my-2'>- Feature -</p>
                <p className='my-2'>- Private Quarters -</p>
                <Link to='/contact'><button className='border border-[#eee] w-[80%] mx-auto my-2 py-2 hover:bg-white/20 cursor mt-4'>Book</button></Link>
            </div>
            <div className='m-8 p-4 border border-[#eee] rounded text-center hover:bg-[#141414]'>
                <h3 className='text-xl font-bold my-2'>- Suite -</h3>
                <div className='border-b w-[10%] max-w-full mx-auto my-2'></div>
                <p className='text-4xl font-bold my-2'>1 BTC</p>
                <p className='my-2'>- 3 Days -</p>
                <p className='my-2'>- Views -</p>
                <p className='my-2'>- Feature -</p>
                <p className='my-2'>- Private Quarters -</p>
                <Link to='/contact'><button className='border border-[#eee] w-[80%] mx-auto my-2 py-2 hover:bg-white/20 cursor mt-4'>Book</button></Link>
            </div>
            <div className='m-8 p-4 border border-[#eee] rounded text-center hover:bg-[#141414]'>
                <h3 className='text-xl font-bold my-2'>- Excusive -</h3>
                <div className='border-b w-[10%] max-w-full mx-auto my-2'></div>
                <p className='text-4xl font-bold my-2'>1 BTC</p>
                <p className='my-2'>- 3 Days -</p>
                <p className='my-2'>- Views -</p>
                <p className='my-2'>- Feature -</p>
                <p className='my-2'>- Private Quarters -</p>
                <Link to='/contact'><button className='border border-[#eee] w-[80%] mx-auto my-2 py-2 hover:bg-white/20 cursor mt-4'>Book</button></Link>
            </div>
        </div>
    </div>
  )
}

export default PricingCards