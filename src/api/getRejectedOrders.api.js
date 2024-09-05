const URL = 'https://maro-cares-z86j.onrender.com/order/getOrder/';
const getRejectedOrders = (setAllOrders, pageNumber, setTotalPage, setCurrentPage) => {
    fetch(`${URL}${pageNumber}?orderStatus=Cancelled`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllOrders(responseJson.orders)
                setTotalPage(responseJson.totalPage)
                setCurrentPage(responseJson.currentPage)
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getRejectedOrders;