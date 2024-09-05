const URL = 'https://maro-cares-z86j.onrender.com/return/removeRequest/';
const deleteReturn = (requestId, setReturnDeleteLoading, setReturnDeleteError, setAllReturns) => {
    setReturnDeleteLoading(true)
    fetch(`${URL}${requestId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllReturns(responseJson.returnRequests)
                setReturnDeleteLoading(false)
                document.querySelector(".delete_return_popup").classList.replace("d-flex", "d-none")
            } else {
                setReturnDeleteError(responseJson.message)
                setReturnDeleteLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setReturnDeleteLoading(false)
        })
}
export default deleteReturn;