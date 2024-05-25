import { SignIn } from "@/pages/auth";
import {
  Blogs,
  Home,
  Notifications,
  Profile,
  Users,
  Loggers,
  Areas,
} from "@/pages/dashboard";
import {
  HomeIcon,
  InformationCircleIcon,
  ServerStackIcon,
  TableCellsIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "blogs",
        path: "/blogs",
        element: <Blogs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "areas",
        path: "/areas",
        element: <Areas />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "logs",
        path: "/loggers",
        element: <Loggers />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
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
    ],
  },
];

export default routes;
