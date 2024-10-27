import className from "classnames/bind";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import Product from "../../../pages/Product";
import Order from "../../../pages/Order";

const cx = className.bind(style);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("logo")}><img src="https://geneat.vn/wp-content/uploads/2024/01/Full_cr-1400x210.png" alt=""></img></div>
      <nav className={cx("nav")}>
        <ul>
          <li>
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li>
            <Link to="/orders">Đơn hàng</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
