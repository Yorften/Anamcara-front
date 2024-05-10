import { useLocation, Outlet } from "react-router-dom";
import Welcome from "../../../views/Welcome";
import Navigation from "./Navigation";
import HomeNavigation from "./HomeNavigation";
import Footer from "./Footer";
import { useEffect } from "react";
import UserRequest from "../../../services/requests/user";
import {
  setIsLoading,
  setToken,
  setUser,
  setUserRoles,
} from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import useCookieMonitor from "./../../../hooks/useCookieMonitor";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  useCookieMonitor();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = UserRequest.getUser();
      response
        .then((data) => {
          dispatch(setUser(data.user));
          dispatch(setUserRoles(data.user_roles));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          dispatch(setUser(null));
          dispatch(setToken(null));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    };

    const storedToken = Cookies.get("token");
    if (!user) {
      fetchUserData();
    } else if (!storedToken) {
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setUserRoles([]));
      dispatch(setIsLoading(false));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, user, token]);

  return (
    <div className='default-layout bg-[#224191] text-white'>
      {<>{location.pathname === "/" ? <HomeNavigation /> : <Navigation />}</>}
      <div className='min-h-[50vh] lg:min-h-screen h-full'>
        {location.pathname === "/" && <Welcome />}
        <Outlet />
      </div>
      {
        <>
          {(location.pathname.startsWith("/checklist") && user) ||
          (location.pathname.startsWith("/checklist/") && user) ? null : (
            <Footer />
          )}
        </>
      }
    </div>
  );
};

export default DefaultLayout;
