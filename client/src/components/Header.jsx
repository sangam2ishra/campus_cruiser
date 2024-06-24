/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';



export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  return (
    <div className='py-7'>
    <Navbar className='border-b-2 h-24 mb-8 fixed w-full z-20 top-0 start-0 mt- flex flex-col dark:bg-black' >
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >  
        <span className='px-3 md:m py-2 bg-gradient-to-r from-blue-700 via-white to-blue-800 rounded-lg text-black font-bold'>
        Campus Cruisers
        </span>
        <span> IIT Bhubaneswar</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
      
      {theme==="light"? <img className='h-20 w-44 ml-[-22px] mx-auto cover ' src="/images/buslight.jpg" alt="" />:  <img className='h-20 w-48  ml-[-22px] mx-auto ' src="/images/busnight.jpg" alt="" />}

      <span>  
     </span>
      {/* <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form> */}
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
        
    
      <div className='flex  gap-2 md:order-2'>
        <Button
          className='w-12 h-10 ml-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar className='w-32' alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/schedule'} as={'div'}>
          <Link to='/schedule'>

          <span className='ml-3 mr-3 px-3 md:m py-2 bg-gradient-to-r from-blue-700 via-white to-blue-800 rounded-lg text-black font-bold'>
              View Schedule
        </span>

          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/bookTrip'} as={'div'}>
          <Link to='/bookTrip'>

          <span className='ml-1 mr-5 px-3 md:m py-2 bg-gradient-to-r from-blue-700 via-white to-blue-800 rounded-lg text-black font-bold'>
              Book trip
        </span>

          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}