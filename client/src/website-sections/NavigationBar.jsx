import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from '../../images/logo.png'
import {useState} from 'react'

const NavigationBar = () =>
{
    const [showMenu, setShowMenu] = useState(false)

    const NavigationElement = ({title, classProps}) => 
    {
        return (
            <li className={`mx-4 cursor-pointer ${classProps}`}>
                {title}
            </li>
        )
    }

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className='w-32 cursor-pointer'></img>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {["Market", "Exchange", "Tutorials", "Wallets"].map((element, index) => (
                    <NavigationElement key={element + index} title={element}></NavigationElement>
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>
            <div className='flex relative'>
                {showMenu 
                ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setShowMenu(false)}></AiOutlineClose> 
                : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setShowMenu(true)}></HiMenuAlt4>
                }
                {showMenu && (
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setShowMenu(false)}></AiOutlineClose>
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((element, index) => (
                            <NavigationElement key={element + index} title={element} classProps='my-2 text-lg'></NavigationElement>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default NavigationBar