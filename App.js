const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6uKVrdBB7YW3vM8Fa2BTCyUR9_MohbjTe9NgZNf6AOhTge3Y-I-fLT8cAOfWPe7FxtQ/exec";

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