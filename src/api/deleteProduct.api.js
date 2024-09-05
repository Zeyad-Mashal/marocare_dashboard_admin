const URL = 'https://maro-cares-z86j.onrender.com/product/removeProduct/';
const AccessTOKEN = localStorage.getItem("user_token")

const searchInput = (setError, setLoading, setAllProduct, productId, setNumberOfProducts) => {
    setLoading(true)
    fetch(`${URL}${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllProduct(responseJson.products)
                setLoading(false)
                setNumberOfProducts(responseJson.numberOfProducts)
                document.querySelector(".delete-product").classList.replace("d-block", "d-none");
            } else {
                setError(responseJson.message);
                setLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default searchInput;