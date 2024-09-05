const URL = 'https://maro-cares-z86j.onrender.com/order/cancellingOrder/';
const AccessTOKEN = localStorage.getItem("user_token")
const rejectedNew = (setCheckedLoading, setCheckedError, setAllOrders, orderId, orderStatus) => {
    setCheckedLoading(true)
    fetch(`${URL}${orderId}/${orderStatus}`, {
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
                document.querySelector(".rejected_check").classList.replace("d-block", "d-none");
            } else {
                setCheckedError(responseJson.message)
                setCheckedLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setCheckedLoading(false)
        })
}
export default rejectedNew;