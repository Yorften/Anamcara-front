import { Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { PiImageSquareDuotone } from "react-icons/pi";
import { FaImages } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";



// eslint-disable-next-line react/prop-types
export default function AdminSideBar({ className }) {
  return (
    <div
      className={`fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-[#1C2434] h-full text-white transition-all duration-300 border-none z-10 sidebar ${className}`}
    >
      <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow'>
        <ul className='flex flex-col py-4 space-y-4'>
          <li className='px-5 hidden md:block'>
            <div className='flex flex-row items-center h-8'>
              <div className='text-sm font-light tracking-wide text-white uppercase'></div>
            </div>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <MdSpaceDashboard />
              </span>
              <span className='ml-2 tracking-wide truncate'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/applicants"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <CiBoxList />
              </span>
              <span className='ml-2 tracking-wide truncate'>Applicants</span>
            </Link>
          </li>
          <li className='flex flex-col gap-2 p-1 bg-transparent/15 rounded'>
            <div className='relative flex flex-row items-center h-11 focus:outline-none  text-white-600 border-l-4 border-transparent pr-6'>
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <PiImageSquareDuotone />
              </span>
              <span className='ml-2 tracking-wide truncate'>Gallery</span>
            </div>
            <Link
              to={"/dashboard/images"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-4 [&>svg]:w-4 ml-2 md:ml-4'>
                <FaImages />
              </span>
              <span className='ml-2 tracking-wide truncate'>Images</span>
            </Link>
            <Link
              to={"/dashboard/videos"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-gray-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ml-2 md:ml-4 text-sm'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-4 [&>svg]:w-4 ml-2 md:ml-4'>
                <BiSolidVideos />
              </span>
              <span className='ml-2 tracking-wide truncate'>Videos</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/settings"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <IoMdSettings />
              </span>
              <span className='ml-2 tracking-wide truncate'>App Settings</span>
            </Link>
          </li>
        </ul>
        <p className='mb-14 px-5 py-3 hidden md:block text-center text-xs'>
          Anamcara - Copyright @2024
        </p>
      </div>
    </div>
  );
}
