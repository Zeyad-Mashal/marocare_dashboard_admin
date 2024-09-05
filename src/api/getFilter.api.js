const URL = 'https://maro-cares-z86j.onrender.com/filter/getDashboardFilter';
const AccessTOKEN = localStorage.getItem("user_token")
const getFilter = (setAllFilter) => {
    fetch(URL, {
        method: "GET",
        headers: {
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllFilter(responseJson.allFilters)
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getFilter;