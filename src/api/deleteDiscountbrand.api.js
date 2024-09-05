const URL = 'https://maro-cares-z86j.onrender.com/discount/removeDiscount/';
const deleteDiscountbrand = (discountId, setDeleteErrorDiscount, setDeleteLoadingDiscount, setAllDiscountBrand) => {
    setDeleteLoadingDiscount(true)
    fetch(`${URL}${discountId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllDiscountBrand(responseJson.allDiscount)
                setDeleteLoadingDiscount(false)
                document.querySelector(".delete_popup").classList.replace("d-flex", "d-none")
            } else {
                setDeleteErrorDiscount(responseJson.message)
                setDeleteLoadingDiscount(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setDeleteLoadingDiscount(false)
        })
}
export default deleteDiscountbrand;