const URL = 'https://maro-cares-z86j.onrender.com/discount/disableDiscount/';
const disableDiscount = (setDisableLoading, setDisableError, setAllDiscountBrand, discountId) => {
    setDisableLoading(true)
    fetch(`${URL}${discountId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllDiscountBrand(responseJson.allDiscount)
                setDisableLoading(false)
                document.querySelector(".disable_popup").classList.replace("d-block", "d-none");
            } else {
                setDisableError(responseJson.message);
                setDisableLoading(false);
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setDisableLoading(false)
        })
}
export default disableDiscount;