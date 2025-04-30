

import axios from 'axios';
import { store } from '../Redux/store'; // חשוב: עדכן את הנתיב בהתאם

const RequestService = {
  getPresignedUrl: async (fileName: string, contentType: string) => {
    const token = store.getState().auth.token;

    const response = await axios.get('https://localhost:7082/api/User/Upload-url', {
      params: { fileName, contentType },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.url;
  },

  uploadFile: async (url: string, file: File, setProgress: (progress: number) => void) => {
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setProgress(percent);
      },
    });
  }
};

export default RequestService;
