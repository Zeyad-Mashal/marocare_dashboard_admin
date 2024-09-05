import React, { useEffect, useState } from "react";
import "./Coupon.css";
import getAllCoupons from "../../api/getAllCoupons.api";
import addCoupon from "../../api/addCoupon.api";
import updateCouponApi from "../../api/updateCouponApi.api";
import deleteCoupon from "../../api/deleteCoupon.api";
import turnCouponStatus from "../../api/turnCouponStatus.api";
const Coupon = () => {
  useEffect(() => {
    getAllCoupons(setAllCoupons);
  }, []);

  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);
  const [startingDate, setStartingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [updateCoupon, setUpdateCoupon] = useState("");
  const [updateCouponDiscount, setUpdateCouponDiscount] = useState("");
  const [updateCouponLoading, setupdateCouponLoading] = useState(false);
  const [updateCouponError, setUpdateCouponError] = useState("");
  const [updateStartingDate, setUpdateStartingDate] = useState("");
  const [updateExpiryDate, setUpdateExpiryDate] = useState("");
  const [couponId, setCouponId] = useState("");
  const [delteCouponLoading, setDelteCouponLoading] = useState(false);
  const [deleteCouponError, setDeleteCouponError] = useState("");
  const [disableCouponLoading, setDisableCouponLoading] = useState(false);
  const [disableCouponError, setDisableCouponError] = useState("");

  const checkExpiration = (startingDate, expiryDate) => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    day = day > 9 ? day : "0" + day;
    month = month > 9 ? month : "0" + month;
    const date = year + "-" + month + "-" + day;
    const currentDate = new Date(date);
    const expiry = new Date(expiryDate);
    const starting = new Date(startingDate);
    if (currentDate <= expiry && currentDate >= starting) {
      return false; // not expire
    } else {
      return true; // it is expire
    }
  };

  const openCouponUpdate = (
    couponId,
    updateCoupon,
    couponDiscount,
    updateStartingDate,
    updateExpiryDate
  ) => {
    setCouponId(couponId);
    setUpdateCoupon(updateCoupon);
    setUpdateCouponDiscount(couponDiscount);
    setUpdateStartingDate(updateStartingDate);
    setUpdateExpiryDate(updateExpiryDate);
    document
      .querySelector(".update-coupon-popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeCouponUpdate = () => {
    document
      .querySelector(".update-coupon-popup")
      .classList.replace("d-flex", "d-none");
  };
  const openCouponDelete = (couponId) => {
    setCouponId(couponId);
    document
      .querySelector(".delete-coupon-popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeCouponDelete = () => {
    document
      .querySelector(".delete-coupon-popup")
      .classList.replace("d-flex", "d-none");
  };
  const openCouponDisable = (couponId) => {
    setCouponId(couponId);
    document
      .querySelector(".stop-coupon-popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeCouponDisable = () => {
    document
      .querySelector(".stop-coupon-popup")
      .classList.replace("d-flex", "d-none");
  };
  const handleAddCoupon = () => {
    const data = {
      coupon,
      discount: couponDiscount,
      startingDate,
      expiryDate,
    };
    addCoupon(
      data,
      setCouponLoading,
      setCouponError,
      setAllCoupons,
      setCoupon,
      setCouponDiscount,
      setStartingDate,
      setExpiryDate
    );
  };
  const handleUpdateCoupon = () => {
    const data = {
      coupon: updateCoupon,
      discount: updateCouponDiscount,
      startingDate: updateStartingDate,
      expiryDate: updateExpiryDate,
    };
    updateCouponApi(
      data,
      setupdateCouponLoading,
      setUpdateCouponError,
      setAllCoupons,
      couponId
    );
  };
  const handleDeleteCoupon = () => {
    deleteCoupon(
      couponId,
      setDelteCouponLoading,
      setDeleteCouponError,
      setAllCoupons
    );
  };
  const handleDisable = () => {
    turnCouponStatus(
      setDisableCouponLoading,
      setDisableCouponError,
      setAllCoupons,
      couponId
    );
  };

  return (
    <div className="coupon-container">
      <div className="addCoupon-box">
        <h3>اضف كوبون خصم</h3>
        <div className="coupon-box">
          <input
            type="text"
            placeholder="كود الكوبون"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <input
            type="text"
            placeholder="نسبة خصم الكوبون"
            value={couponDiscount}
            onChange={(e) => setCouponDiscount(e.target.value)}
          />
        </div>
        <div className="date-box">
          <label htmlFor="startDate">
            <p>تاريخ البداية</p>
            <input
              type="date"
              name="startDate"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
            />
          </label>
          <label htmlFor="endDate">
            <p>تاريخ النهاية</p>
            <input
              type="date"
              name="endDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
        </div>
        <div className="add-btn">
          <p>{couponError}</p>
          <button onClick={handleAddCoupon}>
            {couponLoading ? <span className="loaderAdd"></span> : "إضافة"}
          </button>
        </div>
      </div>
      <div className="table-view">
        <table>
          <tr>
            <th>الكوبون</th>
            <th>نسبة الخصم</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>منتهي الصلاحية</th>
            <th>تعديل</th>
            <th>حذف</th>
            <th>إيقاف</th>
          </tr>
          {allCoupons.map((item) => {
            return (
              <tr>
                <td>
                  <h4>{item.coupon}</h4>
                </td>
                <td>
                  <h4>{item.discount}%</h4>
                </td>
                <td>
                  <p>{item.startingDate}</p>
                </td>
                <td>{item.expiryDate}</td>
                <td>
                  {checkExpiration(item.startingDate, item.expiryDate)
                    ? "غير صالح"
                    : "صالح"}
                </td>
                <td className="coupon-btns">
                  <button
                    className="update-coupon"
                    onClick={() =>
                      openCouponUpdate(
                        item._id,
                        item.coupon,
                        item.discount,
                        item.startingDate,
                        item.expiryDate
                      )
                    }
                  >
                    تعديل
                  </button>
                </td>
                <td className="coupon-btns">
                  <button
                    className="delete-coupon"
                    onClick={() => openCouponDelete(item._id)}
                  >
                    حذف
                  </button>
                </td>
                <td className="coupon-btns">
                  <button
                    className="stop-coupon"
                    onClick={() => openCouponDisable(item._id)}
                  >
                    {item.disable ? "تشغيل" : "إيقاف"}
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {/* update coupon */}
      <div className="update-coupon-popup d-none ">
        <h3>قم بتعديل البيانات الخاصة بالكوبون</h3>
        <div className="coupon-box">
          <input
            type="text"
            placeholder="كود الكوبون"
            value={updateCoupon}
            onChange={(e) => setUpdateCoupon(e.target.value)}
          />
          <input
            type="text"
            placeholder="نسبة خصم الكوبون"
            value={updateCouponDiscount}
            onChange={(e) => setUpdateCouponDiscount(e.target.value)}
          />
        </div>
        <div className="date-box">
          <label htmlFor="startDate">
            <p>تاريخ البداية</p>
            <input
              type="date"
              name="startDate"
              value={updateStartingDate}
              onChange={(e) => setUpdateStartingDate(e.target.value)}
            />
          </label>
          <label htmlFor="endDate">
            <p>تاريخ النهاية</p>
            <input
              type="date"
              name="endDate"
              value={updateExpiryDate}
              onChange={(e) => setUpdateExpiryDate(e.target.value)}
            />
          </label>
        </div>
        <div className="add-btn">
          <p>{updateCouponError}</p>
          <button onClick={handleUpdateCoupon}>
            {updateCouponLoading ? (
              <span className="loaderAdd"></span>
            ) : (
              "تعديل الكوبون"
            )}
          </button>
          <button className="close" onClick={closeCouponUpdate}>
            إلغاء
          </button>
        </div>
      </div>
      {/* delete coupon */}
      <div className="delete-coupon-popup d-none ">
        <h3>هل تريد حذف هذا الكوبون ؟</h3>
        <div className="delete-btns">
          <p>{deleteCouponError}</p>
          <button onClick={handleDeleteCoupon}>
            {delteCouponLoading ? <span className="loaderAdd"></span> : "حذف"}
          </button>
          <button onClick={closeCouponDelete}>لا</button>
        </div>
      </div>
      {/* stop coupon */}
      <div className="stop-coupon-popup d-none">
        <h3>هل تريد تغير حالة هذا الكوبون ؟</h3>
        <div className="delete-btns">
          <p>{disableCouponError}</p>
          <button onClick={handleDisable}>
            {disableCouponLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeCouponDisable}>لا</button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
