import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from "../../images/logo.png";
import "./OrderDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import NewDetails from "../../api/NewDetails.api";
const OrderDetails = () => {
  const { orderId } = useParams();
  useEffect(() => {
    getNewOrderDetails();
  }, []);
  const [newDetailsLoading, setNewDetailsLoading] = useState(false);
  const [newDetailsError, setNewDetailsError] = useState("");
  const [orderDetailsData, setOrderDetailsData] = useState("");
  const opneCheckedproduct = () => {
    document
      .querySelector(".checked_order")
      .classList.replace("d-none", "d-block");
  };
  const opneRejectedproduct = () => {
    document
      .querySelector(".rejected_check")
      .classList.replace("d-none", "d-block");
  };
  const closeCheckedproduct = () => {
    document
      .querySelector(".checked_order")
      .classList.replace("d-block", "d-none");
  };
  const closeRejectedproduct = () => {
    document
      .querySelector(".rejected_check")
      .classList.replace("d-block", "d-none");
  };
  const getNewOrderDetails = () => {
    NewDetails(
      setOrderDetailsData,
      setNewDetailsLoading,
      setNewDetailsError,
      orderId
    );
  };
  if (newDetailsLoading) {
    return (
      <div className="loaderDiv container ">
        <span class="loader"></span>
      </div>
    );
  }
  if (newDetailsError) {
    return (
      <div className="errorDiv container ">
        <p>{newDetailsError}</p>
      </div>
    );
  }
  return (
    <div className="order-container">
      <div className="order-box">
        <div className="order-details">
          <h1>تفاصيل الطلب</h1>
          <h4>اسم العميل: {orderDetailsData.userName}</h4>
          <h5>كود الطلب: {orderDetailsData._id}</h5>
          <h5>اجمالي المبلغ: {orderDetailsData.totalWithoutShipping} ريال</h5>
          <h5>تاريخ الطلب: {orderDetailsData.orderDate}</h5>
          <h5>المدينة التي يتم الشحن لها: {orderDetailsData.userCity}</h5>
        </div>
      </div>
      <div className="new-ordes-holder new-orders_details">
        <table>
          <tr>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>الباركود</th>
            <th>السعر</th>
            <th>الكمية المطلوبة</th>
            <th>اجمالي السعر</th>
            <th>الالوان المطلوبة</th>
          </tr>
          {orderDetailsData.products?.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.product?.images[0]} width={100} />
                </td>
                <td className="name-box">
                  {item.product?.translation.ar.productName}
                </td>
                <td>{item.product?.productCode}</td>
                <td>{item.totalPrice / item.count}</td>
                <td>{item.count}</td>
                <td>{item.totalPrice}</td>
                <td>{item.color ? item.color : "-"}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
