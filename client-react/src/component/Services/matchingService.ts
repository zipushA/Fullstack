const API_URL = "https://localhost:7082/api/MatchingData";

const submitMatchingData = async (data: any) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to submit data");
    }

    return response.json();
};

export default { submitMatchingData };
