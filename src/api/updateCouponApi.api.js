const URL = 'https://maro-cares-z86j.onrender.com/coupon/updateCoupon/';
const updateCouponApi = (data, setupdateCouponLoading, setUpdateCouponError, setAllCoupons, couponId) => {
    setupdateCouponLoading(true)
    fetch(`${URL}${couponId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCoupons(responseJson.allCoupons)
                setupdateCouponLoading(false)
                document.querySelector(".update-coupon-popup").classList.replace("d-flex", "d-none");
            } else {
                setUpdateCouponError(responseJson.message)
                setupdateCouponLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setupdateCouponLoading(false)
        })
}
export default updateCouponApi;