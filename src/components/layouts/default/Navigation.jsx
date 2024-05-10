import DiscordButton from "./DiscordButton";
import NavProfile from "../NavProfile";
import Logo from "../Logo";
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const scrollToJoinUs = () => {
    const joinUsElement = document.getElementById("join_us");
    if (joinUsElement) {
      joinUsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAboutUs = () => {
    const joinUsElement = document.getElementById("about_us");
    if (joinUsElement) {
      joinUsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link onClick={scrollToAboutUs} className='flex items-center'>
          ABOUT US
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link onClick={scrollToJoinUs} className='flex items-center'>
          JOIN US
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Dropdown label='HIGHLIGHTS' inline>
          <Dropdown.Item className='p-0'>
            <Link to={"gallery"} className='w-full px-4 py-2'>
              GALLERY
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='p-0'>
            <Link to={"videos"} className='w-full px-4 py-2'>
              VIDEOS
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        {/* Teenspring store link <Link to={"(link goes here)"} className='flex items-center'> */}
        <Link className='flex items-center'>STORE</Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Dropdown label='TOOLS' inline>
          <Dropdown.Item className='p-0'>
            <Link to={"checklist"} className='w-full px-4 py-2'>
              CHECKLIST
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='p-0'>
            <Link
              to={"https://lostark.meta-game.gg/ability-stone-calculator"}
              target='_blank'
              className='w-full px-4 py-2'
            >
              STONE CUTTER
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </Typography>
    </ul>
  );

  return (
    <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none lg:px-4 py-2 bg-[#313878] border-0 shadow-none'>
      <div className='flex items-center justify-between text-blue-gray-900 px-4 py-2 lg:py-0 lg:px-0'>
        <Logo />
        <div className='flex items-center order-3 gap-4'>
          <div className='mr-4 hidden lg:block'>{navList}</div>
          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
        {isLoading ? (
          <div className='w-[189.33px] lg:order-last'></div>
        ) : token && user ? (
          <NavProfile className='lg:flex hidden' user={user} />
        ) : (
          <DiscordButton className='lg:flex hidden' />
        )}
      </div>
      <Collapse open={openNav}>
        <MobileNav
          scrollToAboutUs={scrollToAboutUs}
          scrollToJoinUs={scrollToJoinUs}
        />
      </Collapse>
    </Navbar>
  );
}
