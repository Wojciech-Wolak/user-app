

export type RouteType = {
  path: string;
  name: string;
  showInNav: boolean;
  showNav: boolean;
  requireLogin: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    showInNav: true,
    showNav: true,
    requireLogin: true,
  },
  {
    path: "/[cityName]",
    name: "Miasto",
    showInNav: false,
    showNav: true,
    requireLogin: true,
  },
  {
    path: "/profile",
    name: "Profil",
    showInNav: true,
    showNav: true,
    requireLogin: true,
  },
  {
    path: "/my-city",
    name: "Moje miasto",
    showInNav: true,
    showNav: true,
    requireLogin: true,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    showInNav: false,
    showNav: false,
    requireLogin: false,
  },
  {
    path: "/new-password",
    name: "New Password",
    showInNav: false,
    showNav: false,
    requireLogin: false,
  },
  {
    path: "/login",
    name: "Login",
    showInNav: false,
    showNav: false,
    requireLogin: false,
  },
  {
    path: "/register",
    name: "Register new account",
    showInNav: false,
    showNav: false,
    requireLogin: false,
  },
];
