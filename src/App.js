import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import AnalysisPage from './components/Analysis/AnalysisPage';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import NewOrder from './components/OrderSystem/NewOrder';
import OrderDetails from './components/OrderSystem/OrderDetails';
import CheckedOrders from './components/OrderSystem/CheckedOrders';
import CheckedOrdersDetails from './components/OrderSystem/CheckedOrdersDetails';
import DoneOrders from './components/OrderSystem/DoneOrders';
import DoneOrdersDetails from './components/OrderSystem/DoneOrdersDetails';
import RejectedOrders from './components/OrderSystem/RejectedOrders';
import RejectedOrdersDetails from './components/OrderSystem/RejectedOrdersDetails';
import AddFilter from './components/Filter/AddFilter';
import Coupon from './components/Coupon/Coupon';
import DiscountBrand from './components/Brands/DiscountBrand';
import ReturnOrders from './components/Returns/ReturnOrders';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import { Navigate } from 'react-router-dom';
function App() {
  const user_token = localStorage.getItem("user_token")
  return (
    <div className='App' >

      {
        user_token ? <Navbar /> : null
      }


      <Routes >
        <Route path="/" element={user_token ? <AnalysisPage /> : <Navigate to="/login" />} />
        <Route path="/product" element={user_token ? <Products /> : <Navigate to="/login" />} />
        <Route path="/order/new" element={user_token ? <NewOrder /> : <Navigate to="/login" />} />
        <Route path="/order/new/details/:orderId" element={user_token ? <OrderDetails /> : <Navigate to="/login" />} />
        <Route path="/order/checked" element={user_token ? <CheckedOrders /> : <Navigate to="/login" />} />
        <Route path="/order/checked/details" element={user_token ? <CheckedOrdersDetails /> : <Navigate to="/login" />} />
        <Route path="/order/done" element={user_token ? <DoneOrders /> : <Navigate to="/login" />} />
        <Route path="/order/done/details" element={user_token ? <DoneOrdersDetails /> : <Navigate to="/login" />} />
        <Route path="/order/rejected" element={user_token ? <RejectedOrders /> : <Navigate to="/login" />} />
        <Route path="/order/rejected/details" element={user_token ? <RejectedOrdersDetails /> : <Navigate to="/login" />} />
        <Route path="/filter" element={user_token ? <AddFilter /> : <Navigate to="/login" />} />
        <Route path="/coupon" element={user_token ? <Coupon /> : <Navigate to="/login" />} />
        <Route path="/discountbrand" element={user_token ? <DiscountBrand /> : <Navigate to="/login" />} />
        <Route path="/returns" element={user_token ? <ReturnOrders /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user_token ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/login" element={user_token ? <Navigate to="/product" /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
