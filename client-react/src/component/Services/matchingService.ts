// const API_URL = "https://localhost:7082/api/MatchingData";

// const submitMatchingData = async (data: any) => {
//     const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to submit data");
//     }
//     return response.json();
// };

// export default { submitMatchingData };
import axios from 'axios';

const API_URL = "https://localhost:7082/api/MatchingData";

export interface MatchingData {
  seniority: number;
  isBoys: boolean;
  isKeruv: boolean;
  residentialArea: string;
}

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
 }

const getMatchingDataById = async (id: number): Promise<MatchingData> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ שגיאה בטעינת נתוני התאמה לפי ID:", error.response?.data || error.message);
    throw new Error("טעינת נתוני ההתאמה נכשלה");
  }
};

export default {
  submitMatchingData,
  getMatchingDataById,
};
