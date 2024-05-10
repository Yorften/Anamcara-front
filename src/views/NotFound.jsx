import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Not Found");

  return (
    <>
      <div className='h-screen w-screen bg-blue-800 flex items-center text-white'>
        <div className='container flex flex-col md:flex-row items-center gap-4 justify-center px-5'>
          <div className='max-w-md'>
            <div className='text-5xl font-dark font-bold'>404</div>
            <p className='text-2xl md:text-3xl font-light leading-normal my-8'>
              Must be nice, getting lost
            </p>

            <Link to={'/'} className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'>
              back to homepage
            </Link>
          </div>
          <div className='max-w-lg'>
            <img
              src='/assets/images/emotes/mokokostare.png'
              className=' w-44'
              alt='gif logo'
            />
          </div>
        </div>
      </div>
    </>
  );
}
