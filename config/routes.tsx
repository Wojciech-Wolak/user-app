

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
    path: "/new-password",
    name: "New Password",
    showInNav: false,
    requireLogin: false,
  },
  {
    path: "/login",
    name: "Login",
    showInNav: false,
    requireLogin: false,
  },
  {
    path: "/register",
    name: "Register new account",
    showInNav: false,
    requireLogin: false,
  },
];
