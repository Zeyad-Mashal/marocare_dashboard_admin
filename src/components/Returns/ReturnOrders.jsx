import React, { useEffect, useState } from "react";
import "./ReturnOrders.css";
import getAllReturn from "../../api/getAllReturn.api";
import returnSearch from "../../api/returnSearch.api";
import deleteReturn from "../../api/deleteReturn.api";
const ReturnOrders = () => {
  const [returnloading, setReturnLoading] = useState(false);
  const [returnError, setReturnError] = useState("");
  const [allReturnsSearch, setAllReturnsSearch] = useState("");
  const [allReturns, setAllReturns] = useState([]);
  const [returnCode, setReturnCode] = useState("");
  const [requestId, setRequestId] = useState("");
  const [returnSearchLoading, setReturnSearchLoading] = useState(false);
  const [returnSearchError, setReturnSearchError] = useState("");
  const [returnDeleteLoading, setReturnDeleteLoading] = useState(false);
  const [returnDeleteError, setReturnDeleteError] = useState("");

  useEffect(() => {
    getAllReturnsRequest(setAllReturns);
  }, []);
  const openDeleteReturn = (requestId) => {
    setRequestId(requestId);
    document
      .querySelector(".delete_return_popup")
      .classList.replace("d-none", "d-flex");
  };
  const closeReturnDelete = () => {
    document
      .querySelector(".delete_return_popup")
      .classList.replace("d-flex", "d-none");
  };
  const getAllReturnsRequest = () => {
    getAllReturn(setAllReturns, setReturnLoading, setReturnError);
  };
  if (returnloading) {
    <span className="loader"></span>;
  }
  const handleReturnSearch = () => {
    returnSearch(
      setReturnSearchLoading,
      setReturnSearchError,
      setAllReturns,
      returnCode
    );
  };
  const handleDelete = () => {
    deleteReturn(
      requestId,
      setReturnDeleteLoading,
      setReturnDeleteError,
      setAllReturns
    );
  };
  return (
    <div className="return_container">
      <div className="return_box">
        <div className="search_box">
          <input
            type="text"
            placeholder="بحث"
            value={returnCode}
            onChange={(e) => {
              setReturnCode(e.target.value);
              if (e.target.value == "") {
                getAllReturnsRequest();
              }
            }}
          />
          <button onClick={handleReturnSearch}>بحث</button>
        </div>
        {returnSearchLoading ? (
          <div className="search_box_loader">
            <span className="loader"></span>
          </div>
        ) : returnSearchError ? (
          <p>{returnSearchError}</p>
        ) : (
          <div className="review_return_table">
            <table>
              <tr>
                <th>اسم العميل</th>
                <th>اسم المنتج</th>
                <th>رقم الهاتف</th>
                <th>رقم الطلب</th>
                <th>سبب الاسترجاع</th>
                <th>حذف</th>
              </tr>
              {allReturns.map((item) => {
                return (
                  <tr>
                    <td className="userName">{item.userID.userName}</td>
                    <td className="productName">{item.productName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.requestCode}</td>
                    <td className="problem">{item.message}</td>
                    <td className="delete">
                      <button
                        className="delete_return"
                        onClick={() => openDeleteReturn(item._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}

        {/* delete return */}
        <div className="delete-coupon-popup delete_return_popup d-none ">
          <h3>هل تريد حذف هذا المرتجع ؟</h3>
          <p>{returnDeleteError}</p>
          <div className="delete-btns">
            <button onClick={handleDelete}>
              {returnDeleteLoading ? (
                <span className="loaderAdd"></span>
              ) : (
                "حذف"
              )}
            </button>
            <button onClick={closeReturnDelete}>لا</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrders;
