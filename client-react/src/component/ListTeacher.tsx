

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from './Redux/store';
// import axios from 'axios';
// import { Box, Card, Typography, Button, Link, CircularProgress, IconButton, Collapse } from '@mui/material';
// import SmartToyIcon from '@mui/icons-material/SmartToy';

// interface Teacher {
//   id: number;
//   name: string;
//   link: string;
// }

// interface AISummary {
//   [teacherId: number]: string;
// }

// const ResumeLinksList: React.FC = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const token = useSelector((state: RootState) => state.auth.token);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [aiSummaries, setAiSummaries] = useState<AISummary>({});
//   const [openCards, setOpenCards] = useState<{ [teacherId: number]: boolean }>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user) return;
//       try {
//         const response = await axios.get(`https://localhost:7082/api/User/OrderData?id=${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTeachers(response.data);
//       } catch (err: any) {
//         setError(err.response?.data || 'שגיאה בטעינת נתונים');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user, token]);

//   const handleDownload = async (url: string) => {
//     try {
//       const response = await axios.get(url, { responseType: 'blob' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(response.data);
//       link.download = url.split('/').pop() || 'file';
//       link.click();
//     } catch {
//       setError('שגיאה בהורדת הקובץ');
//     }
//   };

//   const handleAISummary = async (teacher: Teacher) => {
//     setAiSummaries((prev) => ({ ...prev, [teacher.id]: 'טוען ניתוח AI...' }));
//     try {
//       const response = await axios.get('https://localhost:7082/api/AI/summary', {
//         params: { resumeUrl: teacher.link },
//       });
//       setAiSummaries((prev) => ({ ...prev, [teacher.id]: response.data.summary }));
//       setOpenCards((prev) => ({ ...prev, [teacher.id]: true }));
//     } catch (err: any) {
//       setAiSummaries((prev) => ({ ...prev, [teacher.id]: 'שגיאה בניתוח קובץ' }));
//     }
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         קורות חיים של מורות מתאימות
//       </Typography>
//       {teachers.length === 0 ? (
//         <Typography>לא נמצאו מורות תואמות.</Typography>
//       ) : (
//         teachers.map((teacher) => (
//           <Card key={teacher.id} sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6">{teacher.name}</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
//               <Link href={teacher.link} target="_blank" rel="noopener">
//                 צפי בקו"ח
//               </Link>
//               <Button variant="contained" color="primary" onClick={() => handleDownload(teacher.link)}>
//                 הורד קובץ
//               </Button>
//               <IconButton color="secondary" onClick={() => handleAISummary(teacher)}>
//                 <SmartToyIcon />
//               </IconButton>
//             </Box>

//             <Collapse in={openCards[teacher.id] || false} timeout="auto" unmountOnExit>
//               <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, border: '1px solid #ccc' }}>
//                 <Typography variant="subtitle1">סיכום AI:</Typography>
//                 <Typography>{aiSummaries[teacher.id]}</Typography>
//               </Box>
//             </Collapse>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
// };

// export default ResumeLinksList;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import axios from 'axios';
import { Box, Card, Typography, Button, Link, CircularProgress, IconButton, Collapse, Fade } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Teacher {
  id: number;
  name: string;
  link: string;
}

interface AISummary {
  [teacherId: number]: string;
}

const ResumeLinksList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [aiSummaries, setAiSummaries] = useState<AISummary>({});
  const [openCards, setOpenCards] = useState<{ [teacherId: number]: boolean }>({});
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`https://localhost:7082/api/User/OrderData?id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(response.data);
      } catch (err: any) {
        setError(err.response?.data || 'שגיאה בטעינת נתונים');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, token]);

  const handleDownload = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = url.split('/').pop() || 'file';
      link.click();
    } catch {
      setError('שגיאה בהורדת הקובץ');
    }
  };

  const handleAISummary = async (teacher: Teacher) => {
    setAiSummaries((prev) => ({ ...prev, [teacher.id]: 'טוען ניתוח AI...' }));
    try {
      const response = await axios.get('https://localhost:7082/api/AI/summary', {
        params: { resumeUrl: teacher.link },
      });
      setAiSummaries((prev) => ({ ...prev, [teacher.id]: response.data.summary }));
      setOpenCards((prev) => ({ ...prev, [teacher.id]: true }));
    } catch (err: any) {
      setAiSummaries((prev) => ({ ...prev, [teacher.id]: 'שגיאה בניתוח קובץ' }));
    }
  };

  const handleSortByDistance = async () => {
    if (!user) return;
    setSorting(true);
    try {
      const response = await axios.get('https://localhost:7082/api/Matching/sorted-teachers', {
        params: { principalId: user.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
    } catch (err: any) {
      setError(err.response?.data || 'שגיאה בסידור לפי קרבה');
    } finally {
      setSorting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        קורות חיים של מורות מתאימות
      </Typography>

      <Fade in timeout={1000}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LocationOnIcon />}
          onClick={handleSortByDistance}
          sx={{
            mb: 3,
            animation: sorting ? 'pulse 1s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(0, 150, 255, 0.7)' },
              '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 10px rgba(0, 150, 255, 0)' },
              '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(0, 150, 255, 0)' },
            },
          }}
        >
          סידור לפי קרבה
        </Button>
      </Fade>

      {teachers.length === 0 ? (
        <Typography>לא נמצאו מורות תואמות.</Typography>
      ) : (
        teachers.map((teacher) => (
          <Card key={teacher.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{teacher.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Link href={teacher.link} target="_blank" rel="noopener">
                צפי בקו"ח
              </Link>
              <Button variant="contained" color="primary" onClick={() => handleDownload(teacher.link)}>
                הורד קובץ
              </Button>
              <IconButton color="secondary" onClick={() => handleAISummary(teacher)}>
                <SmartToyIcon />
              </IconButton>
            </Box>

            <Collapse in={openCards[teacher.id] || false} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, border: '1px solid #ccc' }}>
                <Typography variant="subtitle1">סיכום AI:</Typography>
                <Typography>{aiSummaries[teacher.id]}</Typography>
              </Box>
            </Collapse>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ResumeLinksList;
