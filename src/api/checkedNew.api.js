const URL = 'https://maro-cares-z86j.onrender.com/order/confirmationOrder/';
const AccessTOKEN = localStorage.getItem("user_token")
const checkedNew = (setCheckedLoading, setCheckedError, setAllOrders, orderId) => {
    setCheckedLoading(true)
    fetch(`${URL}${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllOrders(responseJson.orders)
                setCheckedLoading(false)
                document.querySelector(".checked_order").classList.replace("d-block", "d-none");
            } else {
                setCheckedError(responseJson.message)
                setCheckedLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setCheckedLoading(false)
        })
}
export default checkedNew;