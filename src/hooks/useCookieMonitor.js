import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearStore } from "../features/auth/authSlice";

const useCookieMonitor = () => {
  const dispatch = useDispatch();
  const [hasCookieChanged, setHasCookieChanged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get("token")) {
        setHasCookieChanged(true);
        dispatch(clearStore());
      } else {
        setHasCookieChanged(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return hasCookieChanged;
};

export default useCookieMonitor;
