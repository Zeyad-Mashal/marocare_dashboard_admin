const URL = 'https://maro-cares-z86j.onrender.com/return/searchReturn/';
const returnSearch = (setReturnSearchLoading, setReturnSearchError, setAllReturns, returnCode) => {
    setReturnSearchLoading(true)
    fetch(`${URL}${returnCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllReturns(responseJson.returnRequests)
                setReturnSearchLoading(false)
            } else {
                setReturnSearchError(responseJson.message);
                setReturnSearchLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default returnSearch;