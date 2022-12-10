

export type RouteType = {
  path: string;
  name: string;
  element: React.ReactNode;
  showInNav: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    element: <div>Hello</div>,
    showInNav: true,
  },
  {
    path: "/:cityId",
    name: "Kraj",
    element: <div>World!</div>,
    showInNav: false,
  },
];

export const routerRoutes = routes.map((route) => ({
  path: route.path,
  element: route.element,
}));
