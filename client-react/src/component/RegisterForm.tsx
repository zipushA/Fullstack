
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputAdornment, IconButton, Button, Container, Typography, Card, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormInput from './FormInput';
import FileUpload from './FileUpload';
import {  UserPostModel, UserRegister } from '../models/UserType';
import { registerUser } from './Services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/slices/authSlice';
import { RootState } from './Redux/store';


const schema = Yup.object().shape({
    name: Yup.string().required('שם הוא שדה חובה'),
    email: Yup.string().email('אימייל לא תקין').required('אימייל הוא שדה חובה'),
    password: Yup.string().required('סיסמא היא שדה חובה'),
    matchingDataId: Yup.number().required('dataId הוא שדה חובה'),
    link: Yup.string().required('קישור הוא שדה חובה'),
    role: Yup.string().oneOf(['teacher', 'principal'], 'תפקיד לא תקין').required('תפקיד הוא שדה חובה'),
});

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const storedDataId = sessionStorage.getItem('dataId');
const matchingDataId = storedDataId ? parseInt(storedDataId, 10) : 0;
const userRole= useSelector((state: RootState) => state.auth.userType);


    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserRegister>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            matchingDataId: matchingDataId,
            link: '',
            role: userRole||'teacher'
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const linkValue = watch('link');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<UserRegister> = async (data) => {
        console.log("submit begin");
        console.log(matchingDataId);
        
        try {
            const userPostModel: UserPostModel = {
                name: data.name,
                email: data.email,
                password: data.password,
                matchingDataId: data.matchingDataId,
                link: data.link
            };

            const res = await registerUser(userPostModel, data.role);
            dispatch(setUser({
                user: res.data.user,
                token: res.data.token,
            }));
            setSnackbarMessage('הרשמה הצליחה!');
            setSnackbarOpen(true);
        } catch (error: any) {
            const errorMessage = error.response ? error.response.data : 'אירעה שגיאה ברשת';
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card sx={{ padding: '30px', backgroundColor: '#FFFCF5', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" sx={{ color: '#00A3A3', fontWeight: 'bold' }}>טופס משתמש</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput name="name" label="שם" control={control} error={errors.name?.message} sx={{ mb: 2 }} />
                    <FormInput name="email" label="אימייל" control={control} error={errors.email?.message} sx={{ mb: 2 }} />
                    <FormInput name="password" label="סיסמא" type={showPassword ? 'text' : 'password'} control={control} error={errors.password?.message} endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#00A3A3' }}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    } sx={{ mb: 2 }} />
                    {/* העלאת קובץ */}
                    <FileUpload onUploadSuccess={(url) => setValue('link', url)} />

                    {/* קישור - תצוגה בלבד */}
                    <TextField label="קישור לקובץ" fullWidth margin="normal" value={linkValue || ''} disabled sx={{ mt: 2 }} />
                    <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#00A3A3', mt: 2, color: '#fff', '&:hover': { backgroundColor: '#006666' } }}>
                        הרשמה
                    </Button>
                </form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
            </Card>
        </Container>
    );
};

export default RegisterForm;
