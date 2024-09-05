import React, { useState, useEffect } from "react";
import "./Admin.css";
import createUser from "../../api/createUser.api";
import getAllUsers from "../../api/getAllUsers.api";
import updateUserAdmin from "../../api/updateUserAdmin.api";
import deleteUserAdmin from "../../api/deleteUserAdmin.api";
const Admin = () => {
  useEffect(() => {
    getAllUsersAdmin(setAllUsers);
  }, []);
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [updateUserRole, setUpdateUserRole] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [updateAddEmail, setUpdateAddEmail] = useState("");
  const [updateAddPassword, setUpdateAddPassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const openUpdatePopup = (userId, userName, email, password, role) => {
    setUserId(userId);
    setUpdateUser(userName);
    setUpdateAddEmail(email);
    setUpdateAddPassword(password);
    setUpdateUserRole(role == "employee" ? "موظف" : "محاسب");
    document
      .querySelector(".update_admin")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdatePopup = () => {
    document
      .querySelector(".update_admin")
      .classList.replace("d-flex", "d-none");
  };
  const opneDeletpopup = (userId) => {
    setUserId(userId);
    document
      .querySelector(".admin_delete")
      .classList.replace("d-none", "d-flex");
  };
  const closeDeletePopup = () => {
    document
      .querySelector(".admin_delete")
      .classList.replace("d-flex", "d-none");
  };
  const getAllUsersAdmin = () => {
    getAllUsers(setAllUsers);
  };
  const handleCreateUsers = () => {
    console.log(userRole);
    const data = {
      userName: user,
      password: addPassword,
      email: addEmail,
      role: userRole == "موظف" ? "employee" : "accountant",
    };
    createUser(
      data,
      setUserLoading,
      setUserError,
      setAllUsers,
      setAddEmail,
      setAddPassword,
      setUser,
      setUserRole
    );
  };
  const handleUpdate = () => {
    const data = {
      userName: updateUser,
      password: updateAddPassword,
      email: updateAddEmail,
      role: updateUserRole == "موظف" ? "employee" : "accountant",
    };
    updateUserAdmin(
      data,
      setUpdateUserLoading,
      setUpdateUserError,
      setAllUsers,
      userId
    );
  };
  const handelDeleteUser = () => {
    deleteUserAdmin(userId, setDeleteLoading, setDeleteError, setAllUsers);
  };
  return (
    <div className="admin_container">
      <div className="admin_box">
        <div className="admin_header">
          <h3>لوحة التحكم الخاصة بال Admin</h3>
          <div className="admin_header_content">
            <input
              type="text"
              placeholder="قم بإضافة موظف اخر : الايميل الخاص به"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="قم بإضافة الباسورد الخاص به"
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="قم بإضافةالاسم الخاص به"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="employee_position">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option>قم بأختيار الوظيفة</option>
                <option>موظف</option>
                <option>محاسب</option>
              </select>
            </div>
          </div>
          <div>
            <p className="error">{userError}</p>
            <button className="btns_admin" onClick={handleCreateUsers}>
              {userLoading ? (
                <span className="loaderAdd"></span>
              ) : (
                "تنفيذ العملية"
              )}
            </button>
          </div>
        </div>
        <div className="employee_content">
          <table>
            <tr>
              <th>اسم الموظف</th>
              <th>الوظيفة</th>
              <th>الايميل</th>
              <th>الباسورد</th>
              <th>تعديل</th>
              <th className="delete">حذف</th>
            </tr>
            {allUsers.map((item) => {
              return (
                <tr>
                  <td>{item.userName}</td>
                  <td>{item.role == "employee" ? "موظف" : "محاسب "}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <button
                      className="upate_employee"
                      onClick={() =>
                        openUpdatePopup(
                          item._id,
                          item.userName,
                          item.email,
                          item.password,
                          item.role
                        )
                      }
                    >
                      تعديل البيانات
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete_employee"
                      onClick={() => opneDeletpopup(item._id)}
                    >
                      حذف البيانات{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        {/* update admin popup */}
        <div className="admin_header update_admin d-none ">
          <h3>تعديل بيانات الموظف</h3>
          <div className="admin_header_content">
            <input
              type="text"
              placeholder="قم بإضافة موظف اخر : الايميل الخاص به"
              value={updateAddEmail}
              onChange={(e) => setUpdateAddEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="قم بإضافة الباسورد الخاص به"
              value={updateAddPassword}
              onChange={(e) => setUpdateAddPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="قم بإضافةالاسم الخاص به"
              value={updateUser}
              onChange={(e) => setUpdateUser(e.target.value)}
            />
            <div className="employee_position">
              <select
                value={updateUserRole}
                onChange={(e) => setUpdateUserRole(e.target.value)}
              >
                <option>موظف</option>
                <option>محاسب</option>
              </select>
            </div>
          </div>
          <div>
            <p>{updateUserError}</p>
            <button className="btns_admin" onClick={handleUpdate}>
              {updateUserLoading ? (
                <span className="loaderAdd"></span>
              ) : (
                "حفظ العملية"
              )}
            </button>
            <button className="btns_admin_close" onClick={closeUpdatePopup}>
              إلغاء العملية
            </button>
          </div>
        </div>
        {/* delete admin popup */}
        <div className="delete_popup admin_delete d-none ">
          <h3>هل تريد حذف بيانات هذا الموظف ؟</h3>
          <div>
            <p className="error"></p>
            <button onClick={handelDeleteUser}>
              {deleteLoading ? <span className="loaderAdd"></span> : "نعم"}
            </button>
            <button onClick={closeDeletePopup}>لا</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
