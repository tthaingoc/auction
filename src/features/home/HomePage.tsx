import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../.././app/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import FeaturedPost from '../../app/components/FeaturedPost';
import MainFeaturedPost from '../../app/components/MainFeaturedPost';

// import post1 from '../blog-post';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

interface Data {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  time: string;
}

export default function HomePage() {
  const [listNews, setListNews] = useState<any>(null);

  const navigate = useNavigate();
  const mainFeaturedPost = {
    title: 'Welcome to Vietnam real estate auction website!',
    description:
      "Where you can search and own the real estate you like at the best price.",
    image: 'https://saigonrealestate.vn/wp-content/uploads/2021/03/Cho-thue-toa-nha-nguyen-can-Thanh-pho-Ho-Chi-Minh.jpg',
    imageText: 'main image description',
  };
  
  // const featuredPosts = [
  //   {
  //     title: 'Featured post',
  //     date: 'Nov 12',
  //     description:
  //       'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //     image: 'https://source.unsplash.com/random?wallpapers',
  //     imageLabel: 'Image Text',
  //   },
  // ];
  
  // const posts = [""];
  
  const sidebar = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  };
  
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  useEffect(()=>{
    const fetchNews = async () => {
      try {         
              // Fetch dữ liệu từ API accounts
              const response = await fetch('https://localhost:5001/api/News');
              if (!response.ok) {
                  throw new Error('Failed to fetch news data');
              }
              const listNewsData: Data = await response.json();
              console.log(listNewsData);
              setListNews(listNewsData);   
      } catch (error) {
          console.error('Đã có lỗi xảy ra:', error);
      }
  };

  fetchNews();
  },[])

  console.log(listNews);
  return (
    //<div>HomePage</div>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
         <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {listNews && listNews.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main> 
      </Container>
      
      <Footer
        title="Real Estate Auctions"
        description="We were born with the goal of providing a convenient and reliable online platform for users to participate in the real estate buying, selling and auction process."
      />
      {/* <div style={{marginTop : '20px'}}>
      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#caced1' }}>
      <MDBContainer className='p-4'>
        <section className=''>
          <MDBRow>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/111.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/112.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/114.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/115.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <MDBRipple
                rippleColor='light'
                className='bg-image hover-overlay shadow-1-strong rounded'
              >
                <img src='https://mdbcdn.b-cdn.net/img/new/fluid/city/116.webp' className='w-100' />
                <a href='#!'>
                  <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
    </div> */}
    </ThemeProvider>
  )
}
