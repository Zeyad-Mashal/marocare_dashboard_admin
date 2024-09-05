import React, { useEffect, useState } from "react";
import "./DiscountBrand.css";
import brandAr from "../data/brand_ar";
import image from "../../images/logo.png";
import reviewDiscountBrand from "../../api/reviewDiscountBrand.api";
import createDiscount from "../../api/createDiscount.api";
import getAlldiscontBrand from "../../api/getAlldiscontBrand.api";
import deleteDiscountbrand from "../../api/deleteDiscountbrand.api";
import updateDiscountbrand from "../../api/updateDiscountbrand.api";
import disableDiscount from "../../api/disableDiscount.api";
const DiscountBrand = () => {
  const [discount, setDiscount] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [brandSelect, setBrandSelect] = useState("");
  const [updateDiscount, setUpdateDiscount] = useState("");
  const [updateStartingDate, setUpdateStartingDate] = useState("");
  const [updateExpiryDate, setUpdateExpiryDate] = useState("");
  const [updateBrandSelect, setupdateBrandSelect] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discountErrorReview, setDiscountErrorReview] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountLoadingReview, setDiscountLoadingReview] = useState(false);
  const [reviewProducts, setReviewProducts] = useState([]);
  const [returnProducts, setReturnProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [allDiscountBrand, setAllDiscountBrand] = useState([]);
  const [deleteErrorDiscount, setDeleteErrorDiscount] = useState("");
  const [deleteLoadingDiscount, setDeleteLoadingDiscount] = useState(false);
  const [updateErrorDiscount, setUpdateErrorDiscount] = useState("");
  const [updateLoadingDiscount, setUpdateLoadingDiscount] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);
  const [disableError, setDisableError] = useState("");
  const [discountId, setDiscountId] = useState("");
  useEffect(() => {
    getAllDicountbrand(setAllDiscountBrand);
  }, []);
  const openUpdateBrand = (
    discountId,
    discount,
    startingDate,
    expiryDate,
    brandSelect
  ) => {
    setDiscountId(discountId);
    setUpdateDiscount(discount);
    setUpdateStartingDate(startingDate);
    setUpdateExpiryDate(expiryDate);
    setupdateBrandSelect(brandSelect);
    document
      .querySelector(".update_popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdateBrand = () => {
    document
      .querySelector(".update_popup")
      .classList.replace("d-flex", "d-none");
  };
  const openDeleteBrand = (discountId) => {
    setDiscountId(discountId);
    document
      .querySelector(".delete_popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeDeleteBrand = () => {
    document
      .querySelector(".delete_popup")
      .classList.replace("d-flex", "d-none");
  };
  const handleReviewBrand = () => {
    const data = {
      discount,
      brand: brandSelect,
      expiryDate,
      startingDate,
    };
    reviewDiscountBrand(
      data,
      setDiscountError,
      setDiscountLoading,
      setReviewProducts
    );
  };
  const closeReviewPopup = () => {
    document
      .querySelector(".review_popup")
      .classList.replace("d-block", "d-none");
  };
  const closeRejectedProducts = () => {
    document
      .querySelector(".return_products")
      .classList.replace("d-block", "d-none");
  };
  const closeDisablePopup = () => {
    document
      .querySelector(".disable_popup")
      .classList.replace("d-block", "d-none");
  };
  const openDisablePopup = (discountId) => {
    setDiscountId(discountId);
    document
      .querySelector(".disable_popup")
      .classList.replace("d-none", "d-block");
  };
  const handleCheckBox = (checked, productId) => {
    if (!checked) {
      setRejectedProducts((current) => [...current, productId]);
    } else {
      setRejectedProducts((prev) => prev.filter((item) => item != productId));
    }
  };
  const getAllDicountbrand = () => {
    getAlldiscontBrand(setAllDiscountBrand);
  };
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
  const handleCheckedDiscount = () => {
    const data = {
      discount,
      brand: brandSelect,
      outProducts: rejectedProducts,
      expiryDate,
      startingDate,
    };
    createDiscount(
      data,
      setDiscountErrorReview,
      setDiscountLoadingReview,
      setReturnProducts,
      setAllDiscountBrand
    );
  };
  const handleDiscountBrand = () => {
    deleteDiscountbrand(
      discountId,
      setDeleteErrorDiscount,
      setDeleteLoadingDiscount,
      setAllDiscountBrand,
      setDiscount,
      setStartingDate,
      setExpiryDate,
      setBrandSelect
    );
  };
  const handleUpdateDiscount = () => {
    const data = {
      discount: updateDiscount,
      brand: updateBrandSelect,
      expiryDate: updateExpiryDate,
      startingDate: updateStartingDate,
    };
    updateDiscountbrand(
      data,
      setUpdateErrorDiscount,
      setUpdateLoadingDiscount,
      setAllDiscountBrand,
      discountId
    );
  };
  const handleDisable = () => {
    disableDiscount(
      setDisableLoading,
      setDisableError,
      setAllDiscountBrand,
      discountId
    );
  };
  return (
    <div className="brand-container">
      <div className="brand-box">
        <h3>إضافة خصم علي البراند</h3>
        <div className="content-brand">
          <input
            type="number"
            placeholder="قم بإدخال قيمة الخصم "
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <div className="label-dev">
            <label htmlFor="startBrand">
              تاريخ البداية
              <input
                type="date"
                name="startBrand"
                value={startingDate}
                onChange={(e) => setStartingDate(e.target.value)}
              />
            </label>
            <label htmlFor="endBrand">
              تاريخ النهاية
              <input
                type="date"
                name="endBrand"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </label>
          </div>
          <select
            value={brandSelect}
            onChange={(e) => setBrandSelect(e.target.value)}
          >
            <option value="اختر البراند">اختر البراند</option>
            {brandAr.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <p className="error">{discountError}</p>
        <div className="done-btns">
          <button onClick={handleReviewBrand}>
            {discountLoading ? (
              <span className="loaderAdd"></span>
            ) : (
              "مراجعة المنتجات"
            )}
          </button>
        </div>
      </div>
      <div className="view-table-discount">
        <div className="table-view">
          <table>
            <tr>
              <th>البراند</th>
              <th>نسبة الخصم</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
              <th>الصلاحية</th>
              <th>تعديل</th>
              <th>حذف</th>
              <th>إيقاف</th>
            </tr>
            {allDiscountBrand.map((item) => {
              return (
                <tr>
                  <td>
                    <h4>{item.brand}</h4>
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
                        openUpdateBrand(
                          item._id,
                          item.discount,
                          item.startingDate,
                          item.expiryDate,
                          item.brand
                        )
                      }
                    >
                      تعديل
                    </button>
                  </td>
                  <td className="coupon-btns">
                    <button
                      className="delete-coupon"
                      onClick={() => openDeleteBrand(item._id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td className="coupon-btns">
                    <button
                      className="stop-coupon"
                      onClick={() => openDisablePopup(item._id)}
                    >
                      {item.disable ? "تشغيل" : "إيقاف"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      {/* update brand */}
      <div className="brand-box update_popup d-none ">
        <h3>تعديل خصم علي البراند</h3>
        <div className="content-brand">
          <input
            type="number"
            placeholder="قم بإدخال قيمة الخصم "
            value={updateDiscount}
            onChange={(e) => setUpdateDiscount(e.target.value)}
          />
          <div className="label-dev">
            <label htmlFor="startBrand">
              تاريخ البداية
              <input
                type="date"
                name="startBrand"
                value={updateStartingDate}
                onChange={(e) => setUpdateStartingDate(e.target.value)}
              />
            </label>
            <label htmlFor="endBrand">
              تاريخ النهاية
              <input
                type="date"
                name="endBrand"
                value={updateExpiryDate}
                onChange={(e) => setUpdateExpiryDate(e.target.value)}
              />
            </label>
          </div>
          <div className="brand_udpate">
            <p>{updateBrandSelect}</p>
          </div>
        </div>

        <div className="done-btns">
          <p className="error">{updateErrorDiscount}</p>
          <button onClick={handleUpdateDiscount}>
            {updateLoadingDiscount ? (
              <span className="loaderAdd"></span>
            ) : (
              "نعم"
            )}
          </button>
          <button className="close_update" onClick={closeUpdateBrand}>
            إلغاء
          </button>
        </div>
      </div>
      {/* delete brand */}
      <div className="delete_popup d-none ">
        <h3>هل تريد حذف هذا الخصم ؟</h3>
        <div>
          <p className="error">{deleteErrorDiscount}</p>
          <button onClick={handleDiscountBrand}>
            {deleteLoadingDiscount ? (
              <span className="loaderAdd"></span>
            ) : (
              "نعم"
            )}
          </button>
          <button onClick={closeDeleteBrand}>لا</button>
        </div>
      </div>
      {/* disable brand */}
      <div className="delete_popup disable_popup d-none ">
        <h3>هل تريد تغير حالة هذا الخصم ؟</h3>
        <div>
          <p className="error">{disableError}</p>
          <button onClick={handleDisable}>
            {disableLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeDisablePopup}>لا</button>
        </div>
      </div>
      {/* review brand products */}
      <div className="review_popup d-none ">
        <div className="review_popup_box">
          <h3>قم بتأكيد المنتجات قبل تنفيذ الخصم</h3>
          <div className="reviwe_table_popup">
            <table>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>الباركود</th>
                <th>السعر قبل الخصم</th>
                <th> السعر بعد الخصم</th>
                <th>تأكيد</th>
              </tr>
              {reviewProducts.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.images[0]} width={120} height={200} />
                    </td>
                    <td>{item.translation.ar.productName}</td>
                    <td>{item.productCode}</td>
                    <td>{item.priceBeforeDiscount}</td>
                    <td>{item.price}</td>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked="true"
                        onChange={(e) =>
                          handleCheckBox(e.target.checked, item._id)
                        }
                      ></input>
                    </td>
                  </tr>
                );
              })}
            </table>
            <p className="error">{discountErrorReview}</p>
            <button onClick={handleCheckedDiscount}>
              {" "}
              {discountLoadingReview ? (
                <span className="loaderAdd"></span>
              ) : (
                "تمت المراجعة"
              )}
            </button>
            <button className="close" onClick={closeReviewPopup}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
      {/* rejected brand products */}
      <div className="review_popup return_products d-none">
        <div className="review_popup_box">
          <h3>منتجات مرفوضة لم يتم تطبيق الخصم عليها</h3>
          <h5>هذه المنتجات تعدت الحد الادني من التكلفة المسموحة للخصم</h5>
          <div className="reviwe_table_popup">
            <table>
              <tr>
                <th>الاسم</th>
                <th>الباركود</th>
                <th> السعر بعد الخصم</th>
                <th>تكلفة المنتج</th>
              </tr>
              {returnProducts.map((item) => {
                return (
                  <tr>
                    <td>{item.productName}</td>
                    <td>{item.productCode}</td>
                    <td>{item.priceAfterDisc}</td>
                    <td>{item.productCost}</td>
                  </tr>
                );
              })}
            </table>
            <button className="close" onClick={closeRejectedProducts}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBrand;
