const URL = 'https://maro-cares-z86j.onrender.com/coupon/disableCoupon/';
const turnCouponStatus = (setDisableCouponLoading, setDisableCouponError, setAllCoupons, couponId) => {
    setDisableCouponLoading(true)
    fetch(`${URL}${couponId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCoupons(responseJson.allCoupons)
                setDisableCouponLoading(false)
                document.querySelector(".stop-coupon-popup").classList.replace("d-flex", "d-none");
            } else {
                setDisableCouponError(responseJson.message);
                setDisableCouponLoading(false);
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setDisableCouponLoading(false)
        })
}
export default turnCouponStatus;