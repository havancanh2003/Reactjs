import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Order from "../pages/Order";
import OrderDetail from './../pages/OrderDetail/index';

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/product", component: Product },
  { path: "/product/:id", component: ProductDetail },
  { path: "/order", component: Order },
  { path: "/order/:id", component: OrderDetail },
];
