const URL = 'https://maro-cares-z86j.onrender.com/filter/addFilter';
const AccessTOKEN = localStorage.getItem("user_token")
const addDiscountBrand = (data, setLoading, setFilterError, setAllFilter, setFilterAr, setFilterEn) => {
    setLoading(true)
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllFilter(responseJson.allFilters)
                setLoading(false)
                setFilterEn("");
                setFilterAr("");
            } else {
                setFilterError(responseJson.message)
                setLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setLoading(false)
        })
}
export default addDiscountBrand;