
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface FormInputProps {
    name: string;
    label: string;
    control: any;
    error?: string;
    type?: string;
    endAdornment?: React.ReactNode;
    sx?: object; // הוספת sx כמאפיין
}

const FormInput: React.FC<FormInputProps> = ({ name, label, control, error, type = 'text', endAdornment, sx }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    error={Boolean(error)}
                    helperText={error}
                    fullWidth
                    InputProps={{
                        endAdornment: endAdornment,
                    }}
                    sx={sx} // העברת sx לרכיב TextField
                />
            )}
        />
    );
};

export default FormInput;
