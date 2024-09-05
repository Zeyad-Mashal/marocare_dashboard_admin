const URL = 'https://maro-cares-z86j.onrender.com/return/getAllReturnRequest';
const getAllReturn = (setAllReturns, setReturnLoading, setReturnError) => {
    setReturnLoading(true)
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllReturns(responseJson.returnRequests)
                setReturnLoading(false)
            } else {
                setReturnError(responseJson.message);
                setReturnLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getAllReturn;