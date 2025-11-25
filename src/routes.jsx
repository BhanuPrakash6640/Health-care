import {
  HomeIcon,
  UserCircleIcon,
  HeartIcon,
  ChartBarIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import Analytics from "@/pages/dashboard/Analytics";
import Vitals from "@/pages/dashboard/Vitals";
import Symptoms from "@/pages/dashboard/Symptoms";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "analytics",
        path: "/analytics",
        element: <Analytics />,
      },
      {
        icon: <HeartIcon {...icon} />,
        name: "vitals",
        path: "/vitals",
        element: <Vitals />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "symptoms",
        path: "/symptoms",
        element: <Symptoms />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
