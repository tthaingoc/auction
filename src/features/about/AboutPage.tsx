import { Container, Paper, Typography } from '@mui/material'

export default function AboutPage() {
  return (
    <>
    
    <div style={{ paddingTop: '100px', backgroundColor: '#131722' }}>
    <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom className='content-element'>
                Trang đấu giá nhà đất - Assignment Group PRN231
            </Typography>
            <Typography variant="body1" className='content-element'>
                Welcome to our auction website, your ultimate destination for all things of real estate
            </Typography>
          
            <Typography variant="body1" className='content-element'>
                Our mission
            </Typography>
            <Typography variant="body1" className='content-element'>
                We are committed to creating a vibrant community of .
            </Typography>
            <Typography variant="body1" className='content-element'>
                Thank you for choosing our real estates auction website as your go-to source for landing auction.
                We hope you have an enjoyable and immersive experience exploring the world of lands with
                us.
            </Typography>
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.215509019063!2d106.6754012!3d10.7688246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edfe2a3180b%3A0x3986871d90d9086b!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbg!5e0!3m2!1svi!2s!4v1696552815837!5m2!1svi!2s"
                width="100%" height="400"
                loading="lazy"
                style={{marginTop:'30px'}}
                >

            </iframe>
        
        </Paper>
    </Container>
    </div>
</>
  )
}
