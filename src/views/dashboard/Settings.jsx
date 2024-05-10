import { Button } from "flowbite-react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import RoleRequest from "./../../services/requests/role";
import Swal from "sweetalert2/src/sweetalert2.js";

export default function Settings() {
  const handleClick = () => {
    const response = RoleRequest.syncRoles();
    response
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Success!",
          html: data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Success!",
          html: error,
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div id='content' className='flex flex-col gap-8 h-full'>
      <div className='flex items-center flex-wrap'>
        <ul className='flex items-center'>
          <li className='inline-flex items-center'>
            <Link to={"/dashboard"} className="className='hover:text-blue-500'">
              <MdSpaceDashboard className='h-6 w-6' />
            </Link>
            <span className='mx-4 h-auto text-gray-400 font-medium'>/</span>
          </li>
          <li className='inline-flex items-center'>
            <Link
              to={"/dashboard/settings"}
              className="className='hover:text-blue-500'"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className='bg-gray-200 w-fit h-[72vh] rounded shadow-lg p-4 flex flex-col items-center'>
        <Button
          onClick={handleClick}
          className='bg-red-600 enabled:bg-red-700 text-gray-200 inline-block'
        >
          Sync Roles
        </Button>
        <p className='text-red-600 font-medium'>*Do not spam sync button!</p>
      </div>
    </div>
  );
}
