const URL = 'https://maro-cares-z86j.onrender.com/discount/createDiscount';
const createDiscount = (data, setDiscountErrorReview, setDiscountLoadingReview, setReturnProducts, setAllDiscountBrand,
    setDiscount, setStartingDate, setExpiryDate, setBrandSelect) => {
    setDiscountLoadingReview(true);
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
                if (responseJson.rejectedProducts.length != 0) {
                    setReturnProducts(responseJson.rejectedProducts)
                    document.querySelector(".return_products").classList.replace("d-none", "d-block");
                }
                setAllDiscountBrand(responseJson.allDiscount)
                setDiscountLoadingReview(false)
                document.querySelector(".review_popup").classList.replace("d-block", "d-none");
                setDiscount("")
                setStartingDate("")
                setExpiryDate("")
                setBrandSelect("")
            } else {
                setDiscountErrorReview(responseJson.message)
                setDiscountLoadingReview(false)
            }
        }).catch(error => {
            setDiscountLoadingReview(false)
            console.log('Error:', error.message);
        })
}
export default createDiscount;