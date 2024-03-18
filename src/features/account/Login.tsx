import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';


export default function Login() {
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
    })
   
    async function submitForm(data: FieldValues) {
        try {
           await agent.Account.login(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container
            component={Paper}
            maxWidth='sm'
            sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit(submitForm)}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('userName', {required: 'Username is required'})} 
                    error={!!errors.userName}
                    helperText={errors?.userName?.message as string}      
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"                 
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                 <LoadingButton 
                    loading={isSubmitting} 
                    disabled={!isValid }
                    type="submit" 
                    fullWidth 
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton> 
                <Grid container>
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}