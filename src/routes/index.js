import Home from "../pages/Home";
import Product from "../pages/Product";
import Order from "../pages/Order";
import OrderDetail from './../pages/OrderDetail/index';
import OrderCreate from './../pages/OrderCreate/index';

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Product },
  { path: "/orders", component: Order },
  { path: "/orders/create-order", component: OrderCreate },
  { path: "/orders/:orderId", component: OrderDetail },
];
