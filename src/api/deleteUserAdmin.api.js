const URL = 'https://maro-cares-z86j.onrender.com/user/removeUser/';
const AccessTOKEN = localStorage.getItem("user_token")
const deleteUserAdmin = (userId, setDeleteLoading, setDeleteError, setAllUsers) => {
    setDeleteLoading(true)
    fetch(`${URL}${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllUsers(responseJson.users)
                setDeleteLoading(false)
                document.querySelector(".admin_delete").classList.replace("d-flex", "d-none")
            } else {
                setDeleteError(responseJson.message)
                setDeleteLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setDeleteLoading(false)
        })
}
export default deleteUserAdmin;