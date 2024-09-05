const URL = 'https://maro-cares-z86j.onrender.com/filter/updateFilter/';
const AccessTOKEN = localStorage.getItem("user_token")
const updateFilter = (data, setUpdateLoading, setUpdateFilterError, setAllFilter, filterId) => {
    setUpdateLoading(true)
    fetch(`${URL}${filterId}`, {
        method: "PUT",
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
                setUpdateLoading(false)
                document.querySelector(".filter-input-udpate").classList.replace("d-block", "d-none");
            } else {
                setUpdateFilterError(responseJson.message)
                setUpdateLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setUpdateLoading(false)
        })
}
export default updateFilter;