

export type RouteType = {
  path: string;
  name: string;
  showInNav: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    showInNav: true,
  },
  {
    path: "/:cityId",
    name: "Miasto",
    showInNav: false,
  },
  {
    path: "/profile",
    name: "Profil",
    showInNav: true,
  },
];
