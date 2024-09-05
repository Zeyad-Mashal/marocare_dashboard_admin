import React, { useEffect, useState } from "react";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./DoneOrders.css";
import { Link } from "react-router-dom";
import getDoneOrders from "../../api/getDoneOrders.api";
import getAllDoneSearch from "../../api/getAllDoneSearch.api";
const DoneOrders = () => {
  useEffect(() => {
    getAllDoneOrders();
  }, []);
  const [allOrders, setAllOrders] = useState([]);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
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
  const getAllDoneOrders = () => {
    getDoneOrders(setAllOrders, 1, setTotalPage, setCurrentPage);
  };
  const handleSearch = () => {
    getAllDoneSearch(setError, setLoading, setAllOrders, searchOrderId);
  };
  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getDoneOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      getDoneOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
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
              getAllDoneOrders();
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
        <div className="done-orders details">
          <div className="done-ordes-holder ">
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
                    <td className="td-done">
                      <p className="done">المكتلمة</p>
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

      {/* rejected */}
      <div className="checked_order rejected_check d-none ">
        <h3>هل تريد إلغاء الطلب ؟</h3>
        <div>
          <button>نعم</button>
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

export default DoneOrders;
