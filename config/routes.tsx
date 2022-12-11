

export type RouteType = {
  path: string;
  name: string;
  showInNav: boolean;
  requireLogin: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    showInNav: true,
    requireLogin: true,
  },
  {
    path: "/[cityName]",
    name: "Miasto",
    showInNav: false,
    requireLogin: true,
  },
  {
    path: "/profile",
    name: "Profil",
    showInNav: true,
    requireLogin: true,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    showInNav: false,
    requireLogin: false,
  },
  {
    path: "/login",
    name: "Forgot Password",
    showInNav: false,
    requireLogin: false,
  },
  {
    path: "/register",
    name: "Forgot Password",
    showInNav: false,
    requireLogin: false,
  },
];
