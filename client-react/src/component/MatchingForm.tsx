// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { InputAdornment, IconButton, Button, Container, Typography, Card, MenuItem, TextField } from '@mui/material';
// import FormInput from './FormInput'; // ייבוא הקומפוננטה הגנרית
// import matchingService from '../component/Services/matchingService';

// // 🔹 ולידציה
// const schema = Yup.object().shape({
//     seniority: Yup.number().required('ניסיון הוא שדה חובה').min(0, 'המספר חייב להיות חיובי'),
//     isBoys: Yup.boolean().required('שדה חובה'),
//     isKeruv: Yup.boolean().required('שדה חובה'),
//     residentialArea: Yup.string().required('אזור מגורים הוא שדה חובה'),
// });

// const MatchingForm = () => {
//     const { control, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             seniority: 0,
//             isBoys: false,
//             isKeruv: false,
//             residentialArea: '',
//         },
//     });

//     const onSubmit = async (data: any) => {
//         try {
//             await matchingService.submitMatchingData(data);
//             console.log('נתונים נשלחו בהצלחה:', data);
//         } catch (error) {
//             console.error('שגיאה בשליחת הנתונים:', error);
//         }
//     };

//     return (
//         <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
//             <Card sx={{ padding: '30px', backgroundColor: '#FFFCF5', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
//                 <Typography variant="h4" align="center" sx={{ color: '#00A3A3', fontWeight: 'bold' }}>טופס התאמה</Typography>
//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     <FormInput
//                         name="seniority"
//                         label="ותק (בשנים)"
//                         type="number"
//                         control={control}
//                         error={errors.seniority?.message}
//                     />

//                     <FormInput
//                         name="isBoys"
//                         label="מתאים לבנים?"
//                         type="checkbox"
//                         control={control}
//                         error={errors.isBoys?.message}
//                     />

//                     <FormInput
//                         name="isKeruv"
//                         label="תוכנית קירוב?"
//                         type="checkbox"
//                         control={control}
//                         error={errors.isKeruv?.message}
//                     />

//                     <FormInput
//                         name="residentialArea"
//                         label="אזור מגורים"
//                         control={control}
//                         error={errors.residentialArea?.message}
//                     />

//                     <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#00A3A3', marginTop: '20px', color: '#fff', '&:hover': { backgroundColor: '#006666' } }}>
//                         שלח
//                     </Button>
//                 </form>
//             </Card>
//         </Container>
//     );
// };

// export default MatchingForm;
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Container, Typography, Card, Box } from '@mui/material';
import FormInput from './FormInput'; // ייבוא הקומפוננטה הגנרית
import matchingService from '../component/Services/matchingService';

// 🔹 ולידציה
const schema = Yup.object().shape({
    seniority: Yup.number().required('ניסיון הוא שדה חובה').min(0, 'המספר חייב להיות חיובי'),
    isBoys: Yup.boolean().required('שדה חובה'),
    isKeruv: Yup.boolean().required('שדה חובה'),
    residentialArea: Yup.string().required('אזור מגורים הוא שדה חובה'),
});

const MatchingForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            seniority: 0,
            isBoys: false,
            isKeruv: false,
            residentialArea: '',
        },
    });

    const onSubmit = async (data:any) => {
        try {
            await matchingService.submitMatchingData(data);
            console.log('נתונים נשלחו בהצלחה:', data);
        } catch (error) {
            console.error('שגיאה בשליחת הנתונים:', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card sx={{ padding: '30px', backgroundColor: '#FFFCF5', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" sx={{ color: '#00A3A3', fontWeight: 'bold' }}>טופס התאמה</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <Box mb={2}>
                        <FormInput
                            name="seniority"
                            label="ותק (בשנים)"
                            type="number"
                            control={control}
                            error={errors.seniority?.message}
                        />
                    </Box>
                    
                    <Box mb={2}>
                        <FormInput
                            name="isBoys"
                            label="מתאים לבנים?"
                            type="checkbox"
                            control={control}
                            error={errors.isBoys?.message}
                        />
                    </Box>
                    
                    <Box mb={2}>
                        <FormInput
                            name="isKeruv"
                            label="תוכנית קירוב?"
                            type="checkbox"
                            control={control}
                            error={errors.isKeruv?.message}
                        />
                    </Box>
                    
                    <Box mb={2}>
                        <FormInput
                            name="residentialArea"
                            label="אזור מגורים"
                            control={control}
                            error={errors.residentialArea?.message}
                        />
                    </Box>
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx={{ 
                            backgroundColor: '#00A3A3', 
                            marginTop: '20px', 
                            color: '#fff', 
                            '&:hover': { backgroundColor: '#006666' } 
                        }}
                    >
                        שלח
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default MatchingForm;
