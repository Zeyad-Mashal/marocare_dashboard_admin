const URL = 'https://maro-cares-z86j.onrender.com/discount/getAllDiscount';
const getAlldiscontBrand = (setAllDiscountBrand) => {
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllDiscountBrand(responseJson.allDiscount);
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getAlldiscontBrand;