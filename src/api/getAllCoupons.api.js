const URL = 'https://maro-cares-z86j.onrender.com/coupon/getAllCoupon';
const getAllCoupons = (setAllCoupons) => {
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCoupons(responseJson.allCoupons)
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getAllCoupons;