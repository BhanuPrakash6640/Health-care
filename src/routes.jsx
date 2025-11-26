import {
  HomeIcon,
  UserCircleIcon,
  HeartIcon,
  ChartBarIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BeakerIcon,
  DocumentTextIcon,
  CalendarIcon,
  ServerIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import Analytics from "@/pages/dashboard/Analytics";
import Vitals from "@/pages/dashboard/Vitals";
import Symptoms from "@/pages/dashboard/Symptoms";
import { SignIn, SignUp } from "@/pages/auth";
import Medications from "@/pages/Medications";
import Records from "@/pages/Records";
import Appointments from "@/pages/Appointments";
import Resources from "@/pages/Resources";
import AuditLog from "@/pages/AuditLog";

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
      {
        icon: <BeakerIcon {...icon} />,
        name: "medications",
        path: "/medications",
        element: <Medications />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "records",
        path: "/records",
        element: <Records />,
      },
      {
        icon: <CalendarIcon {...icon} />,
        name: "appointments",
        path: "/appointments",
        element: <Appointments />,
      },
      {
        icon: <ServerIcon {...icon} />,
        name: "resources",
        path: "/resources",
        element: <Resources />,
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "audit-log",
        path: "/audit-log",
        element: <AuditLog />,
      }
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
