const URL = "https://maro-cares-z86j.onrender.com/feedback/remove/";
const AccessTOKEN = localStorage.getItem("user_token")
const deleteFeedBack = async (setError, setAllFeedbacks, setDeleteLoading, feedbackId) => {
    setDeleteLoading(true)
    try {
        const response = await fetch(`${URL}${feedbackId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authrization": `maroTK${AccessTOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllFeedbacks(result.feedbacks)
            setDeleteLoading(false)
            document.querySelector(".contact_delete").style.display = "none"
            window.location.reload()
        } else {
            if (response.status == 400) {
                setError(result.message);
            }
            setDeleteLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setDeleteLoading(false)
    }
}
export default deleteFeedBack;