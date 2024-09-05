import React, { useEffect, useState } from "react";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./CheckedOrders.css";
import { Link } from "react-router-dom";
import getCheckedOrders from "../../api/getCheckedOrders.api";
import rejectedNew from "../../api/rejectedNew.api";
import addToDone from "../../api/addToDone.api";
import getAllCheckedSearch from "../../api/getAllCheckedSearch.api";
const CheckedOrders = () => {
  useEffect(() => {
    getAllCheckOrders();
  }, []);
  const [allOrders, setAllOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [checkedLoading, setCheckedLoading] = useState(false);
  const [checkedError, setCheckedError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const openDoneProduct = (orderId) => {
    setOrderId(orderId);
    document
      .querySelector(".checked_order_done")
      .classList.replace("d-none", "d-block");
  };
  const openRejectedProduct = (orderId) => {
    setOrderId(orderId);
    document
      .querySelector(".rejected_check")
      .classList.replace("d-none", "d-block");
  };
  const closeCheckedproduct = () => {
    document
      .querySelector(".checked_order_done")
      .classList.replace("d-block", "d-none");
  };
  const closeRejectedproduct = () => {
    document
      .querySelector(".rejected_check")
      .classList.replace("d-block", "d-none");
  };
  const getAllCheckOrders = () => {
    getCheckedOrders(setAllOrders, 1, setTotalPage, setCurrentPage);
  };
  const rejectedOrderNew = () => {
    rejectedNew(
      setCheckedLoading,
      setCheckedError,
      setAllOrders,
      orderId,
      "Processing"
    );
  };
  const handleCompletedOrder = () => {
    addToDone(setCheckedLoading, setCheckedError, setAllOrders, orderId);
  };
  const handleSearch = () => {
    getAllCheckedSearch(setError, setLoading, setAllOrders, searchOrderId);
  };
  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getCheckedOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      getCheckedOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
    }
  };
  return (
    <div className="orders-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="ابحث بالكود الطلب"
          value={searchOrderId}
          onChange={(e) => {
            setSearchOrderId(e.target.value);
            if (e.target.value == "") {
              getAllCheckOrders();
            }
          }}
        />
        <div>
          <button onClick={handleSearch}>بحث</button>
        </div>
      </div>

      {loading ? (
        <span className="loaderSearch"></span>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="checked-orders details">
          <div className="checked-ordes-holder">
            <table>
              <tr>
                <th>الاسم</th>
                <th>حالة الطلب</th>
                <th>السعر</th>
                <th>التاريخ</th>
                <th>كود الطلب</th>
                <th>التفاصيل</th>
              </tr>
              {allOrders.map((item) => {
                return (
                  <tr>
                    <td>
                      <h5>{item.userName}</h5>
                    </td>
                    <td className="td-checked">
                      <p className="checked">مؤكدة</p>
                    </td>
                    <td>{item.totalWithoutShipping}</td>
                    <td>{item.orderDate}</td>
                    <td>{item._id}</td>
                    <td>
                      <div class="btn-group dropend w-100">
                        <button
                          type="button"
                          class="btn"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <Link to={`/order/new/details/${item._id}`}>
                              تفاصيل الطلب
                            </Link>
                          </li>
                          <li onClick={() => openDoneProduct(item._id)}>
                            أكمال الطلب
                          </li>
                          <li onClick={() => openRejectedProduct(item._id)}>
                            إلغاء الطلب
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}

      {/* done */}
      <div className="checked_order checked_order_done d-none">
        <h3>هل تم اكمال الطلب نهائيا ؟</h3>
        <div>
          <p className="error">{checkedError}</p>
          <button onClick={handleCompletedOrder}>
            {checkedLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeCheckedproduct}>لا</button>
        </div>
      </div>
      {/* rejected */}
      <div className="checked_order rejected_check d-none ">
        <h3>هل تريد إلغاء الطلب ؟</h3>
        <p className="error">{checkedError}</p>
        <div className="text-center">
          <button onClick={rejectedOrderNew}>
            {checkedLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeRejectedproduct}>لا</button>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination-controls">
        <button onClick={next}>التالي</button>
        <button onClick={previous}>السابق</button>
      </div>
    </div>
  );
};

export default CheckedOrders;
