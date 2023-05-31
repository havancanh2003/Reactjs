import className from "classnames/bind";
import style from "./Header.module.scss";

const cx = className.bind(style);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("top-header")}>
        {/* top header */}
        <div className={cx("logo")}>
          <span>Truyen Hay VL</span>
        </div>
        {/* nav top header */}
        <div className={cx("nav-top-header")}>
          <ul>
            <li>Home</li>
            <li>New Update</li>
            <li>Top Manga</li>
            <li>History</li>
          </ul>
        </div>
        <div className={cx("right_top_header")}>
          <input type="text" placeholder="" />
          <div className={cx("user")}>
            <img
              src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={cx("img-header")}>
        <img src="https://wallpaperaccess.com/full/4462578.jpg" alt="" />
      </div>
      <div className={cx("nav-header")}>
        <ul>
          <li>HÀNH ĐỘNG</li>
          <li>HÀI HƯỚC</li>
          <li>CHUYỂN SINH</li>
          <li>GIẢ TƯỞNG</li>
          <li>SHOUNEN</li>
          <li>SHOJUH</li>
          <li id={cx("all-manga")}>ALL MANGA</li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
