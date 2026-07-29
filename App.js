const GOOGLE_SCRIPT_URL = "YOUR_COPIED_WEB_APP_URL_HERE";

async function submitRating(ratingValue, userFeedback = "") {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            // Using text/plain avoids CORS preflight restrictions in Apps Script
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                rating: ratingValue,
                feedback: userFeedback
            })
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Thank you! Your rating has been saved.");
        }
    } catch (error) {
        console.error("Error submitting rating:", error);
    }
}

// Example usage: trigger when a button or star is clicked
// submitRating(5, "Great video quality!");