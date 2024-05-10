import { createBrowserRouter } from "react-router-dom";
import Apply from "./views/Apply";
import Images from "./views/Images";
import Videos from "./views/Videos";
import Tasks from "./views/checklist/Tasks";
import Characters from "./views/checklist/Characters";
import DashboardSettings from "./views/dashboard/Settings";
import DashboardImages from "./views/dashboard/Images";
import DashboardVideos from "./views/dashboard/Videos";
import Applicants from "./views/dashboard/Applicants";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/layouts/default/DefaultLayout";
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout";
import DiscordAuthCallback from "./services/requests/DiscordAuthCallback";
import Application from "./views/dashboard/Application";
import History from "./views/dashboard/History";
import ChecklistLayout from "./components/layouts/checklist/ChecklistLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/apply",
        element: <Apply />,
      },

      {
        path: "/gallery",
        element: <Images />,
      },

      {
        path: "/videos",
        element: <Videos />,
      },

      {
        path: "/checklist",
        element: <ChecklistLayout />,
        children: [
          {
            path: "/checklist/tasks",
            element: <Tasks />,
          },

          {
            path: "/checklist/characters",
            element: <Characters />,
          },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/applicants",
        element: <Applicants />,
      },

      {
        path: "/dashboard/applicants/history",
        element: <History />,
      },

      {
        path: "/dashboard/applicants/:id",
        element: <Application />,
      },

      {
        path: "/dashboard/images",
        element: <DashboardImages />,
      },

      {
        path: "/dashboard/videos",
        element: <DashboardVideos />,
      },

      {
        path: "/dashboard/settings",
        element: <DashboardSettings />,
      },
    ],
  },

  {
    path: "/auth/discord/callback",
    element: <DiscordAuthCallback />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
