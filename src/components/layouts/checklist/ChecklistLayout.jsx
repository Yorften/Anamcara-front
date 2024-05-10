import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Index from "./../../../views/checklist/Index";
import Welcome from "../../../views/checklist/Welcome";
import ChecklistSideBar from "./ChecklistSideBar";

export default function ChecklistLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (!user) {
    navigate("/");
  }

  return (
    <div>
      <div>
        {location.pathname === "/checklist" && !user && !isLoading && (
          <Welcome />
        )}
      </div>
      <div className='h-full flex flex-col flex-auto flex-shrink-0 antialiased'>
        {user && (
          <main className='ml-14 md:ml-56 min-h-screen h-full bg-[#313338]'>
            <ChecklistSideBar
              className={"top-[44px] sm:top-[52px] lg:top-[56px] shadow-xl"}
            />
            {user &&
              (location.pathname === "/checklist" ||
                location.pathname === "/checklist/") && <Index />}
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
}
