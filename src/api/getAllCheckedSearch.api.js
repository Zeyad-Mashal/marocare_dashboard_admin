const URL = 'https://maro-cares-z86j.onrender.com/order/search/';
const getAllCheckedSearch = (setError, setLoading, setAllOrders, orderId) => {
    setLoading(true)
    fetch(`${URL}${orderId}?orderStatus=Processing`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllOrders(responseJson.orders)
                setLoading(false)
            } else {
                setError(responseJson.message);
                setLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getAllCheckedSearch;