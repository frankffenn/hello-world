import doge from './logo.png'
import { Link } from 'react-router-dom' 
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'

interface Props {
    show: boolean
}

const Navbar = (props: Props) => {
    return (
        <div className={props.show ? 'sidenav active' : 'sidenav'}>
            <img src={doge} className='logo' alt="logo"></img>
            <ul>
                <li>
                    <Link to="/"><BiHomeAlt></BiHomeAlt>Home</Link>
                    {/* <Link> 的“跳转”行为只会触发相匹配的<Route>对应的页面内容更新，而不会刷新整个页面。 */}
                </li>
                <li>
                    <Link to="/about"><BsFillPersonFill></BsFillPersonFill>About us</Link>
                </li>
                {/* <li>
                    <a href="/contact"><FiPhoneCall></FiPhoneCall>Contact us</a>
                </li> */}
            </ul>
        </div>
    )
}

export default Navbar