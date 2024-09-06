const URL = "https://maro-cares-z86j.onrender.com/feedBack/visible/";
const AccessTOKEN = localStorage.getItem("user_token")
const showFeedBack = async (feedbackData, setError, setAllFeedbacks, setvisibleLoading, feedbackId) => {
    setvisibleLoading(true)
    try {
        const response = await fetch(`${URL}${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authrization": `maroTK${AccessTOKEN}`
            },
            body: JSON.stringify(feedbackData)
        });

        const result = await response.json();

        if (response.ok) {
            setAllFeedbacks(result.feedbacks)
            setvisibleLoading(false)
            window.location.reload()
        } else {
            if (response.status == 400) {
                setError(result.message);
            }
            setvisibleLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setvisibleLoading(false)
    }
}
export default showFeedBack;