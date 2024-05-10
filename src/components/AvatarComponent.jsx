/* eslint-disable react/prop-types */
import { Avatar } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";

export default function AvatarComponent({ imageUrl, user, application }) {
  const location = useLocation();

  return (
    <div className='flex items-center gap-2'>
      <Avatar
        alt='User settings'
        img={imageUrl}
        rounded
        className='flex items-center'
      />
      {location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/" ? (
        user.nick ? (
          <p className='hidden md:block'>{user.nick}</p>
        ) : (
          <p className='hidden md:block'>{user.username}</p>
        )
      ) : user.nick ? (
        <p>{user.nick}</p>
      ) : (
        <p>{user.username}</p>
      )}
      {!application && <IoIosArrowDown />}
    </div>
  );
}
