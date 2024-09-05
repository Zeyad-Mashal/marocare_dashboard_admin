const URL = 'https://maro-cares-z86j.onrender.com/product/getAllProduct/';
const getAllProduct = (setAllProduct, setServerErrors, setServerloading, pageNumber, setTotalPage, setCurrentPage, setNumberOfProducts) => {
    setServerloading(true)
    fetch(`${URL}${pageNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setServerloading(false)
                setTotalPage(responseJson.totalPage)
                setCurrentPage(responseJson.currentPage)
                setAllProduct(responseJson.products)
                setNumberOfProducts(responseJson.numberOfProducts)
            } else {
                setServerErrors(responseJson.message);
                setServerloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setServerloading(false)
        })
}
export default getAllProduct;