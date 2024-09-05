const URL = 'https://maro-cares-z86j.onrender.com/user/createUser';
const AccessTOKEN = localStorage.getItem("user_token")
const createUser = (data, setUserLoading, setUserError, setAllUsers, setAddEmail, setAddPassword, setUser, setUserRole) => {
    setUserLoading(true);
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
                setAllUsers(responseJson.users)
                setUserLoading(false)
                setAddEmail("")
                setAddPassword("")
                setUser("")
                setUserError("")
                setUserRole("قم بأختيار الوظيفة")
            } else {
                setUserError(responseJson.message)
                setUserLoading(false)
            }
        }).catch(error => {
            setUserLoading(false)
            console.log('Error:', error.message);
        })
}
export default createUser;