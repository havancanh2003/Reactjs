import className from "classnames/bind";
import style from "./Header.module.scss";

const cx = className.bind(style);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <h2>header</h2>
    </header>
  );
}
export default Header;
