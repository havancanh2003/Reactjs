import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Upload from "../pages/Upload";

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/detail", component: Detail },
  { path: "/upload", component: Upload, layout: null },
];
