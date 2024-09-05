import React from "react";
import Logo from "../../images/logo.png";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import { Link } from "react-router-dom";
const Navbar = () => {
  const removeToken = () => {
    localStorage.removeItem("user_token");
    window.location.reload();
  };
  return (
    <header>
      <nav>
        <img src={Logo} width={170} />
        <div className="nav-content">
          <ul>
            <li>
              <Link to={"/"}>لوحة التحكم الرئسية</Link>
            </li>
            <li>
              <div class="btn-group dropend w-100">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  الطلبات
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link to={"/order/new"}>الطلبات الجديدة</Link>
                  </li>
                  <li>
                    <Link to={"/order/checked"}>الطلبات مؤكدة</Link>
                  </li>
                  <li>
                    <Link to={"/order/done"}>الطلبات المكتملة</Link>
                  </li>
                  <li>
                    <Link to={"/order/rejected"}>الطلبات الملغية</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to={"/product"}>المنتجات</Link>
            </li>
            <li>
              <Link to={"/filter"}>اضافة فيلتر</Link>
            </li>
            <li>
              <Link to={"/coupon"}>ألكوبونات</Link>
            </li>
            <li>
              <Link to={"/discountbrand"}>خصم البراندات</Link>
            </li>
            <li>
              <Link to={"/returns"}>المرتجعات</Link>
            </li>
            <li>
              <Link to={"/admin"}>لوحة تحكم Admin</Link>
            </li>
            <li onClick={removeToken}>تسجيل خروج</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
