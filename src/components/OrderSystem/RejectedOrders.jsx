import React, { useEffect, useState } from "react";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./RejectedOrders.css";
import { Link } from "react-router-dom";
import getRejectedOrders from "../../api/getRejectedOrders.api";
import getAllRejectedSearch from "../../api/getAllRejectedSearch.api";
const RejectedOrders = () => {
  useEffect(() => {
    getAllRejectedOrders();
  }, []);
  const [allOrders, setAllOrders] = useState([]);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const openDeleteproduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-none", "d-block");
    document
      .querySelector(".rejected-ordes-holder")
      .classList.replace("d-block", "d-none");
  };
  const closeDeleteProduct = () => {
    document
      .querySelector(".delete-product")
      .classList.replace("d-block", "d-none");
    document
      .querySelector(".rejected-ordes-holder")
      .classList.replace("d-none", "d-block");
  };
  const getAllRejectedOrders = () => {
    getRejectedOrders(setAllOrders, 1, setTotalPage, setCurrentPage);
  };
  const handleSearch = () => {
    getAllRejectedSearch(setError, setLoading, setAllOrders, searchOrderId);
  };
  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getRejectedOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      getRejectedOrders(setAllOrders, newpage, setTotalPage, setCurrentPage);
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
              getAllRejectedOrders();
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
        <div className="rejected-orders">
          <div className="rejected-ordes-holder">
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
                    <td className="td-rejected">
                      <p className="rejected">ملغية</p>
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

      {/* pagination */}
      <div className="pagination-controls">
        <button onClick={next}>التالي</button>
        <button onClick={previous}>السابق</button>
      </div>
    </div>
  );
};

export default RejectedOrders;
