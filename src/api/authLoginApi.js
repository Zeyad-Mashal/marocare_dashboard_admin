const URL = 'https://maro-cares-z86j.onrender.com/auth/dashboardLogin';
const authLoginApi = (data, setError, setloading) => {
    setloading(true)
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                localStorage.setItem("user_token", responseJson.userToken)
                setloading(false)
                window.location.reload();
            } else {
                setError(responseJson.message);
                setloading(false)
            }
        }).catch(error => {
            console.log('Error:', error.message);
            setloading(false)
        })
}
export default authLoginApi;