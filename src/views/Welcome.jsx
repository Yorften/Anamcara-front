// import { useEffect } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
// import UserRequest from "../services/requests/user";
import Gvg from "../components/layouts/default/Gvg";
import Events from "../components/layouts/default/Events";
import AboutUs from "../components/layouts/default/AboutUs";
import JoinUs from "../components/layouts/default/JoinUs";
import Emotes from "../components/layouts/default/Emotes";

function Welcome() {
  useDocumentTitle("Welcome");

  // useEffect(() => {
  //   const user = UserRequest.getUser();
  // }, []);

  return (
    <div className='mt-[40vw]'>
      <Gvg />
      <Events />
      <AboutUs />
      <JoinUs userInGuild={true} />
      <Emotes />
    </div>
  );
}

export default Welcome;
