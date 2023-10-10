import { Link } from 'react-router-dom'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'

interface Props {
    show: boolean
}

const Navbar = (props: Props) => {
    return (
        <div className={`bg-[#011627] transition-all duration-300	 absolute h-[90vh] px-6 w-60 ${props.show? `left-0`:`-left-full`}` }>
            <ul className='p-0'>
                <li className='block'>
                    <Link className='text-white flex px-2 py-3 hover:bg-sky-900 rounded ' to='/'> <BiHomeAlt2 className='mr-4 my-1'></BiHomeAlt2>Home</Link>
                </li>
                <li className='block'>
                    <Link className='text-white flex px-2 py-3 hover:bg-sky-900 rounded ' to='/about'><BsFillPersonFill className='mr-4 my-1'></BsFillPersonFill>About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar