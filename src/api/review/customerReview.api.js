const URL = "https://maro-cares-z86j.onrender.com/feedback/get";
const customerReview = async (setError, setAllFeedbacks, setLoading) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        console.log(result);

        if (response.ok) {
            setAllFeedbacks(result.feedbacks)
            setLoading(false)
        } else {
            setError(result.message);
            setLoading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default customerReview;