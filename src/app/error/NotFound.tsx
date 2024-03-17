import { Container, Paper, Typography, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant={'h3'}>Sản phẩm bạn đang tìm không tồn tại !!!</Typography>
            <Divider />
            <Button component={Link} to='/catalog' fullWidth>Trở lại trang chính</Button>
        </Container>
  )
}
