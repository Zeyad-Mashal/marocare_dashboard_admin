const URL = 'https://maro-cares-z86j.onrender.com/user/getAllUser';
const AccessTOKEN = localStorage.getItem("user_token")
const getAllUsers = (setAllUsers) => {
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authrization": `maroTK${AccessTOKEN}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllUsers(responseJson.users)
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message);
        })
}
export default getAllUsers;