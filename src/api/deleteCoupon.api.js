const URL = 'https://maro-cares-z86j.onrender.com/coupon/deleteCoupon/';
const deleteCoupon = (couponId, setDelteCouponLoading, setDeleteCouponError, setAllCoupons) => {
    setDelteCouponLoading(true)
    fetch(`${URL}${couponId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCoupons(responseJson.allCoupons)
                setDelteCouponLoading(false)
                document.querySelector(".delete-coupon-popup").classList.replace("d-flex", "d-none")
            } else {
                setDeleteCouponError(responseJson.message)
                setDelteCouponLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setDelteCouponLoading(false)
        })
}
export default deleteCoupon;