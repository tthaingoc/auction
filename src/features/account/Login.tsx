import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Avatar, Typography, Box, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import agent from '../../app/api/agent';


export default function Login() {
    const [values, setValues] = useState({
        userName: '',
        password: ''
    })
 
    const handleSubmit = (event: any) => {
        event.preventDefault()
        agent.Account.login(values);
    }

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
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
                onSubmit={handleSubmit}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="userName"
                    autoFocus
                    onChange={handleInputChange}
                    value={values.userName}             
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    name="password"                   
                    onChange={handleInputChange}
                    value={values.password}     
                />
                 <LoadingButton 
                    // loading={isSubmitting} 
                    // disabled={!isValid }
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