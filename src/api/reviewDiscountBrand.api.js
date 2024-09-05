const URL = 'https://maro-cares-z86j.onrender.com/discount/reviewDiscount';
const reviewDiscountBrand = (data, setDiscountError, setDiscountLoading, setReviewProducts) => {
    setDiscountLoading(true);
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
                setReviewProducts(responseJson.products)
                setDiscountLoading(false)
                document.querySelector(".review_popup").classList.replace("d-none", "d-block");
            } else {
                setDiscountError(responseJson.message)
                setDiscountLoading(false)
            }
        }).catch(error => {
            setDiscountLoading(false)
            console.log('Error:', error.message);
        })
}
export default reviewDiscountBrand;