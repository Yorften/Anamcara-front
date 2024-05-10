import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegCheckSquare } from "react-icons/fa";


// eslint-disable-next-line react/prop-types
export default function ChecklistSideBar({ className }) {
  return (
    <div
      className={`fixed flex flex-col top-14 left-0 w-14 hover:w-56 md:w-56 bg-[#1C2434] h-full text-white transition-all duration-300 border-none z-10 sidebar ${className}`}
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
              to={"/checklist"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <FaRegCheckSquare />
              </span>
              <span className='ml-2 tracking-wide truncate'>Checklist</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/checklist/tasks"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <FaTasks />
              </span>
              <span className='ml-2 tracking-wide truncate'>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/checklist/characters"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-5 [&>svg]:w-5 ml-2 md:ml-4'>
                <IoPersonSharp />
              </span>
              <span className='ml-2 tracking-wide truncate'>Characters</span>
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
