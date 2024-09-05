import React from "react";
import "./AnalysisPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faDollarSign,
  faTruckFast,
  faCircleCheck,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
const AnalysisPage = () => {
  return (
    <div className="container">
      <div className="header_analysis">
        <div className="top_header">
          <h1>Maro Care</h1>
          <input type="date" placeholder="اختر التاريخ لأختيار البيانات" />
        </div>
        <div className="bottom_header">
          <div className="card_analysis">
            <FontAwesomeIcon icon={faDollarSign} />
            <div>
              <h5>المدفوعات اليومية</h5>
              <h6>0.00 ريال</h6>
            </div>
          </div>
          <div className="card_analysis">
            <FontAwesomeIcon icon={faSackDollar} />
            <div>
              <h5>صافي الربح</h5>
              <h6>0.00 ريال</h6>
            </div>
          </div>
          <div className="card_analysis">
            <FontAwesomeIcon icon={faTruckFast} />
            <div>
              <h5>الطلبيات اليوم</h5>
              <h6>0</h6>
            </div>
          </div>
          <div className="card_analysis">
            <FontAwesomeIcon icon={faCircleCheck} />
            <div>
              <h5>الطلبيات الناجحة</h5>
              <h6>0</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="body_analysis">
        <div className="coupon card_products">
          <FontAwesomeIcon icon={faShop} />
          <h4>عدد الكوبونات في وضع التشغيل</h4>
          <h5>0</h5>
        </div>
        <div className="return card_products">
          <FontAwesomeIcon icon={faShop} />
          <h3>المرتجعات اليوم</h3>
          <h5>0</h5>
        </div>
        <div className="card_products">
          <FontAwesomeIcon icon={faShop} />
          <h3>عدد المنتجات</h3>
          <h5>1000 منتج</h5>
        </div>
      </div>
      <div className="copyRight">
        <p>كل الحقوق محفوظة لدى شركة مارو كير | 2024 &copy;</p>
      </div>
    </div>
  );
};

export default AnalysisPage;
