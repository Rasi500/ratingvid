import React, { useState } from 'react';

// 1. Google Form submission URL (ending in /formResponse)
const FORM_URL = "https://docs.google.com/forms/d/e/1d1KVm49IO4TZT9q46LgHhGfU7KM750ZSRrYihVBa5O8/formResponse";

function App() {
    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            alert("Please select a rating before submitting!");
            return;
        }

        // 2. Prepare Form Data payload
        const formData = new FormData();

        // ⚠️ REPLACE THE NUMBERS BELOW WITH YOUR EXACT ENTRY NUMBERS FROM THE CONSOLE
        formData.append("entry.2134580153", rating);     // Rating field ID (e.g., entry.123456789)
        formData.append("entry.430487842", feedback);  // Feedback field ID (e.g., entry.987654321)

        try {
            await fetch(FORM_URL, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });

            setSubmitted(true);
            alert("Thank you! Your rating has been saved.");
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Video Rating App</h1>

            {/* Optional: Your Video Player Component or iframe goes here */}
            <div style={{ background: '#000', color: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
                <p>[ Video Player Area ]</p>
            </div>

            {submitted ? (
                <div style={{ background: '#e6fffa', border: '1px solid #319795', padding: '15px', borderRadius: '6px' }}>
                    <h3>Thank you for your feedback!</h3>
                    <button onClick={() => { setSubmitted(false); setRating(''); setFeedback(''); }}>
                        Submit Another Rating
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3>Rate this video</h3>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Rating:</label>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <label key={num} style={{ marginRight: '15px', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={num}
                                    checked={rating === String(num)}
                                    onChange={(e) => setRating(e.target.value)}
                                    style={{ marginRight: '5px' }}
                                />
                                {num} {num === 1 ? 'Star' : 'Stars'}
                            </label>
                        ))}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Feedback / Comments:</label>
                        <textarea
                            rows="4"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Tell us what you thought..."
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#3182ce',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Submit Rating
                    </button>
                </form>
            )}
        </div>
    );
}

export default App;