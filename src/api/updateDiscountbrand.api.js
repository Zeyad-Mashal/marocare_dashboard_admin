const URL = 'https://maro-cares-z86j.onrender.com/discount/updateDiscount/';
const updateDiscountbrand = (data, setUpdateErrorDiscount, setUpdateLoadingDiscount, setAllDiscountBrand, discountId) => {
    setUpdateLoadingDiscount(true)
    fetch(`${URL}${discountId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllDiscountBrand(responseJson.allDiscount)
                setUpdateLoadingDiscount(false)
                document.querySelector(".update_popup").classList.replace("d-flex", "d-none");
            } else {
                setUpdateErrorDiscount(responseJson.message)
                setUpdateLoadingDiscount(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setUpdateLoadingDiscount(false)
        })
}
export default updateDiscountbrand;