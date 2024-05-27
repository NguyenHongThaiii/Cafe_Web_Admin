import { SignIn } from "@/pages/auth";
import {
  Areas,
  Blogs,
  Conveniences,
  Home,
  Kinds,
  Loggers,
  Profile,
  Purposes,
  Users,
} from "@/pages/dashboard";
import {
  CubeTransparentIcon,
  CursorArrowRippleIcon,
  HomeIcon,
  MapPinIcon,
  QueueListIcon,
  ServerStackIcon,
  ShoppingBagIcon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
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
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "blogs",
        path: "/blogs",
        element: <Blogs />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "areas",
        path: "/areas",
        element: <Areas />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "kinds",
        path: "/kinds",
        element: <Kinds />,
      },
      {
        icon: <CursorArrowRippleIcon {...icon} />,
        name: "conveniences",
        path: "/conveniences",
        element: <Conveniences />,
      },
      {
        icon: <CubeTransparentIcon {...icon} />,
        name: "purposes",
        path: "/purposes",
        element: <Purposes />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "logs",
        path: "/loggers",
        element: <Loggers />,
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
