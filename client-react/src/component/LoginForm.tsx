

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputAdornment, IconButton, Button, Container, Typography, Card, Link, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormInput from './FormInput'; // ייבוא הקומפוננטה הגנרית
import { loginUser } from './Services/AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../component/Redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'; // הוספתי ייבוא


// 🔹 ולידציה
const schema = Yup.object().shape({
    email: Yup.string().email('אימייל לא תקין').required('אימייל הוא שדה חובה'),
    password: Yup.string().required('סיסמא היא שדה חובה'),
});

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ייבוא הפונקציה לניווט


    const { control, handleSubmit, formState: { errors },reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
        try {
            const res = await loginUser(data.email, data.password);
            console.log('Success:', res.data); 
            dispatch(setUser({
                user: res.data.user,
                token: res.data.token,
            }));
               
            reset();
            setSnackbarMessage('התחברת בהצלחה');
            setSnackbarOpen(true);
            // אפשר גם לנווט פה אחרי התחברות מוצלחת אם תרצי
             navigate('/auth/list');
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response ? error.response.data : 'אירעה שגיאה ברשת';
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleNavigateToRegister = () => {
        navigate('/auth/data');
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card sx={{ padding: '30px', backgroundColor: '#FFFCF5', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" sx={{ color: '#00A3A3', fontWeight: 'bold' }}>התחברות</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* 🔹 שדה אימייל */}
                    <FormInput
                        name="email"
                        label="אימייל"
                        control={control}
                        error={errors.email ? errors.email.message : undefined}
                        sx={{ marginBottom: '20px' }}
                    />

                    {/* 🔹 שדה סיסמא עם כפתור הצגת סיסמא */}
                    <FormInput
                        name="password"
                        label="סיסמא"
                        type={showPassword ? 'text' : 'password'}
                        control={control}
                        error={errors.password ? errors.password.message : undefined}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#00A3A3' }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{ marginBottom: '20px' }}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#00A3A3', marginTop: '20px', color: '#fff', '&:hover': { backgroundColor: '#006666' } }}>
                        התחבר
                    </Button>
                </form>

                <Typography align="center" sx={{ marginTop: '15px' }}>
                    <Link
                        onClick={handleNavigateToRegister}
                        sx={{ color: '#00A3A3', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        אין לך סיסמא עדיין? לחצי כאן
                    </Link>
                </Typography>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Card>
        </Container>
        
    );
};

export default LoginForm;
