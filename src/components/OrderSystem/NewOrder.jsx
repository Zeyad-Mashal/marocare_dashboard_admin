import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./NewOrder.css";
import OrderDetails from "./OrderDetails";
import { Link } from "react-router-dom";
import getNewOrder from "../../api/getNewOrder.api";
import checkedNew from "../../api/checkedNew.api";
import rejectedNew from "../../api/rejectedNew.api";
import getAllNewSearch from "../../api/getAllNewSearch.api";
const NewOrder = () => {
  useEffect(() => {
    getAllNewOrders();
  }, []);
  const [allOrders, setAllOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [checkedLoading, setCheckedLoading] = useState(false);
  const [checkedError, setCheckedError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const opneCheckedproduct = (orderId) => {
    setOrderId(orderId);
    document
      .querySelector(".checked_order")
      .classList.replace("d-none", "d-block");
  };
  const opneRejectedproduct = (orderId) => {
    setOrderId(orderId);
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
  const getAllNewOrders = () => {
    getNewOrder(setAllOrders, 1, setCurrentPage, setTotalPage);
  };
  const checkedOrderNew = () => {
    checkedNew(setCheckedLoading, setCheckedError, setAllOrders, orderId);
  };
  const rejectedOrderNew = () => {
    rejectedNew(
      setCheckedLoading,
      setCheckedError,
      setAllOrders,
      orderId,
      "New"
    );
  };
  const handleSearch = () => {
    getAllNewSearch(setError, setLoading, setAllOrders, searchOrderId);
  };

  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getNewOrder(setAllOrders, newpage, setCurrentPage, setTotalPage);
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      getNewOrder(setAllOrders, newpage, setCurrentPage, setTotalPage);
    }
  };
  return (
    <div className="orders-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="ابحث بكود الطلب"
          value={searchOrderId}
          onChange={(e) => {
            setSearchOrderId(e.target.value);
            if (e.target.value == "") {
              getAllNewOrders();
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
        <>
          <div className="new-orders">
            <div className="new-ordes-holder">
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
                      <td className="td-new">
                        <p className="new">جديد</p>
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
                            <li onClick={() => opneCheckedproduct(item._id)}>
                              تأكيد الطلب
                            </li>
                            <li onClick={() => opneRejectedproduct(item._id)}>
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
          <div className="pagination-controls">
            <button onClick={next}>التالي</button>
            <button onClick={previous}>السابق</button>
          </div>
        </>
      )}

      {/* pagination */}

      {/* checked */}
      <div className="checked_order d-none">
        <h3>هل تريد تأكيد الطلب ؟</h3>
        <p className="error">{checkedError}</p>
        <div>
          <button onClick={checkedOrderNew}>
            {" "}
            {checkedLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeCheckedproduct}>لا</button>
        </div>
      </div>
      {/* rejected */}
      <div className="checked_order rejected_check d-none ">
        <h3>هل تريد إلغاء الطلب ؟</h3>
        <p>{checkedError}</p>
        <div>
          <button onClick={rejectedOrderNew}>
            {checkedLoading ? <span className="loaderAdd"></span> : "نعم"}
          </button>
          <button onClick={closeRejectedproduct}>لا</button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
