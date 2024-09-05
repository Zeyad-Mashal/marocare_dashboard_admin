const URL = 'https://maro-cares-z86j.onrender.com/coupon/createCoupon';
const addCoupon = (data, setCouponLoading, setCouponError, setAllCoupons, setCoupon, setCouponDiscount, setStartingDate, setExpiryDate) => {
    setCouponLoading(true)
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCoupons(responseJson.allCoupons)
                setCouponLoading(false)
                setCoupon("");
                setCouponDiscount("");
                setStartingDate("");
                setExpiryDate("");
            } else {
                setCouponError(responseJson.message)
                setCouponLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setCouponLoading(false)
        })
}
export default addCoupon;