const URL = 'https://maro-cares-z86j.onrender.com/order/orderDetails/';
const NewDetails = (setOrderDetailsData, setNewDetailsLoading, setNewDetailsError, orderId) => {
    setNewDetailsLoading(true)
    fetch(`${URL}${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setNewDetailsLoading(false)
                setOrderDetailsData(responseJson.order);
            } else {
                setNewDetailsError(responseJson.message)
                setNewDetailsLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setNewDetailsLoading(false)
        })
}
export default NewDetails;