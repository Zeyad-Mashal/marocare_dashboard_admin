const URL = 'https://maro-cares-z86j.onrender.com/product/addProduct';
const AccessTOKEN = window.localStorage.getItem("user_token")
const addProduct = (productData, setError, setloading, setAllProduct, setTotalPage, setCurrentPage, setNumberOfProducts, currentPage) => {
    setloading(true)
    fetch(`${URL}/${currentPage}`, {
        method: "POST",
        headers: {
            "authrization": `maroTK${AccessTOKEN}`
        },
        body: productData
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setloading(false)
                setAllProduct(responseJson.products)
                setTotalPage(responseJson.totalPage)
                setCurrentPage(responseJson.currentPage)
                setNumberOfProducts(responseJson.numberOfProducts)
                document.querySelector(".add-prodcut_popup").classList.replace("d-flex", "d-none");
            } else {
                setError(responseJson.message);
                setloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setloading(false)
        })
}
export default addProduct;