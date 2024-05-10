import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import applicationReducer from "../features/applications/applicationSlice";
import applicantReducer from "../features/applications/applicantSlice";
import videoReducer from "../features/videos/videoSlice";
import imageReducer from "../features/images/imageSlice";
import characterReducer from "../features/characters/characterSlice";
import taskReducer from "../features/tasks/taskSlice";
import iconReducer from "../features/icons/iconSlice";
import taskIconReducer from "../features/icons/taskIconSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    applicant: applicantReducer,
    img: imageReducer,
    vid: videoReducer,
    character: characterReducer,
    task: taskReducer,
    icon: iconReducer,
    taskIcon: taskIconReducer,
  },
});
