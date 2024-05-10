import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthRequest from "./auth";
import {
  setUser,
  setToken,
  setUserRoles,
  setIsLoading,
} from "../../features/auth/authSlice";

export default function DiscordAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  const formData = new FormData();

  formData.append("code", code);

  useEffect(() => {
    const response = AuthRequest.postAuth(formData);
    response
      .then((data) => {
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setUserRoles(data.user_roles));
        dispatch(setIsLoading(false));
        navigate("/");
      })
      .catch(() => {
        navigate("/");
      });
  }, [dispatch]);

  return (
    <>
      <div className='h-screen bg-blue-800 flex items-center justify-center text-white'>
        <img
          src='/assets/images/Anamlogo_large_transparent.gif'
          className='h-60 w-60'
          alt=''
        />
      </div>
    </>
  );
}
