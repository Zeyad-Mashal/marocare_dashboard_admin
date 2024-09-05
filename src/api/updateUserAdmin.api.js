const URL = 'https://maro-cares-z86j.onrender.com/user/updateUser/';
const AccessTOKEN = localStorage.getItem("user_token")
const updateUserAdmin = (data, setUpdateUserLoading, setUpdateUserError, setAllUsers, userId) => {
    setUpdateUserLoading(true)
    fetch(`${URL}${userId}`, {
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
                setAllUsers(responseJson.users)
                setUpdateUserLoading(false)
                document.querySelector(".update_admin").classList.replace("d-flex", "d-none");
            } else {
                setUpdateUserError(responseJson.message)
                setUpdateUserLoading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setUpdateUserLoading(false)
        })
}
export default updateUserAdmin;