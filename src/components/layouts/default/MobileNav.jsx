import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavProfile from "../NavProfile";
import DiscordButton from "./DiscordButton";

export default function MobileNav() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);
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
  return (
    <div className='flex gap-1 w-full'>
      <ul className='flex flex-col py-4 space-y-4 w-2/3'>
        <li className='px-5 hidden md:block'>
          <div className='flex flex-row items-center h-8'>
            <div className='text-sm font-light tracking-wide text-white uppercase'></div>
          </div>
        </li>
        <li>
          <p
            onClick={scrollToAboutUs}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
          >
            <span className='ml-2 tracking-wide truncate'>ABOUT US</span>
          </p>
        </li>
        <li>
          <p
            onClick={scrollToJoinUs}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
          >
            <span className='ml-2 tracking-wide truncate'>JOIN US</span>
          </p>
        </li>
        <li className='flex flex-col gap-2 p-1 bg-transparent/15 rounded'>
          <div className='relative flex flex-row items-center h-11 focus:outline-none  text-white-600 border-l-4 border-transparent pr-6'>
            <span className='ml-2 tracking-wide truncate'>Gallery</span>
          </div>
          <Link
            to={"/images"}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
          >
            <span className='ml-2 tracking-wide truncate'>Images</span>
          </Link>
          <Link
            to={"/videos"}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
          >
            <span className='ml-2 tracking-wide truncate'>Videos</span>
          </Link>
        </li>
        <li>
          <Link
            to={"#"}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
          >
            <span className='ml-2 tracking-wide truncate'>Store</span>
          </Link>
        </li>
        <li className='flex flex-col gap-2 p-1 bg-transparent/15 rounded'>
          <div className='relative flex flex-row items-center h-11 focus:outline-none  text-white-600 border-l-4 border-transparent pr-6'>
            <span className='ml-2 tracking-wide truncate'>Tools</span>
          </div>
          <Link
            to={"/checklist"}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
          >
            <span className='ml-2 tracking-wide truncate'>Checklist</span>
          </Link>
          <Link
            to={"https://lostark.meta-game.gg/ability-stone-calculator"}
            className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
          >
            <span className='ml-2 tracking-wide truncate'>Stone Cutter</span>
          </Link>
        </li>
      </ul>
      <div className="py-10 w-full flex justify-center ">
        {isLoading ? (
          <div className='w-[189.33px] lg:order-last'></div>
        ) : user ? (
          <NavProfile className='flex px-1 h-20' user={user} />
        ) : (
          <DiscordButton className='h-14' />
        )}
      </div>
    </div>
  );
}
