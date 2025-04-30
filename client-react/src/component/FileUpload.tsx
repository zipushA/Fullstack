
import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RequestService from '../component/Services/RequestService';

const TURQUOISE_COLOR = '#00A3A3';

type Props = {
  onUploadSuccess: (url: string) => void;
};

const FileUpload: React.FC<Props> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage("");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage("");
    try {
      const presignedUrl = await RequestService.getPresignedUrl(file.name, file.type);
      await RequestService.uploadFile(presignedUrl, file, setProgress);
      const publicUrl = `https://zipushresume.s3.amazonaws.com/resume/${file.name}`; // החלף ל-S3 שלך
      onUploadSuccess(publicUrl);
      setMessage('הקובץ הועלה בהצלחה');
    } catch (error) {
      console.error('שגיאה בהעלאה', error);
      setMessage('שגיאה בהעלאה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <input type="file" id="file-input" hidden onChange={handleFileChange} />
      <label htmlFor="file-input">
        <IconButton component="span" sx={{ color: TURQUOISE_COLOR }}>
          <CloudUploadIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </label>
      {file && <Typography>{file.name}</Typography>}
      <Box mt={2}>
        <Button variant="contained" sx={{ bgcolor: TURQUOISE_COLOR, '&:hover': { bgcolor: '#008080' } }} onClick={handleUpload} disabled={loading || !file}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'העלה קו"ח'}
        </Button>
      </Box>
      {progress > 0 && <Typography mt={2}>התקדמות: {progress}%</Typography>}
      {message && <Typography mt={2} color="#008080">{message}</Typography>}
    </Box>
  );
};

export default FileUpload;
