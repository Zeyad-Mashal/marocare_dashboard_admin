import React from "react";
import image from "../../images/logo.png";
import "./OrderDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./DoneOrders.css";
const DoneOrdersDetails = () => {
  const openRejectedProduct = () => {
    document
      .querySelector(".rejected_check")
      .classList.replace("d-none", "d-block");
  };
  const closeRejectedproduct = () => {
    document
      .querySelector(".rejected_check")
      .classList.replace("d-block", "d-none");
  };
  return (
    <div className="order-container">
      <div className="order-box">
        <div className="img-holder">
          <img src={image} width={250} />
          <img src={image} width={250} />
          <img src={image} width={250} />
        </div>
        <div className="order-details">
          <h1> تفاصيل الطلب المكتملة</h1>
          <h4>اسم العميل: زياد احمد</h4>
          <h5>كود الطلب: Ab12356</h5>
          <h5>اجمالي المبلغ: 500 ريال</h5>
          <h5>تاريخ الطلب: 2024/3/6</h5>
          <h5>المدينة التي يتم الشحن لها: الرياض</h5>
        </div>
        <div className="order-btns">
          <p className="done-p">تم اكتمال الطلب</p>
          <button>إلغاء</button>
        </div>
      </div>
      <div className="done-orders done_orders_details">
        <div className="done-ordes-holder">
          <table>
            <tr>
              <th>الصورة</th>
              <th>الباركود</th>
              <th>البراند</th>
              <th>الفئة</th>
              <th>اجمالي السعر</th>
              <th>الكمية المطلوبة</th>
              <th>الالوان المطلوبة</th>
            </tr>
            <tr>
              <td>
                <img src={image} width={100} />
              </td>
              <td>123456794426</td>
              <td>البراند</td>
              <td>الفئة</td>
              <td>500</td>
              <td>2</td>
              <td>#000</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoneOrdersDetails;
