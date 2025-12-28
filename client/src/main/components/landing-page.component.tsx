import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  keyframes,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AppleIcon from '@mui/icons-material/Apple';

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const backgroundMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: `${backgroundMove} 15s ease infinite`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero Section */}
        <Container
          maxWidth="lg"
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pt: 10, pb: 8 }}
        >
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '3rem', md: '4rem', lg: '4.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    color: '#111827',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Transfer music
                  <Box component="span" sx={{ color: '#3b82f6' }}>
                    {' '}
                    instantly.
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    mb: 5,
                    lineHeight: 1.6,
                    fontWeight: 400,
                    maxWidth: 480,
                    fontSize: '1.25rem',
                  }}
                >
                  The easiest way to move your playlists between Youtube, Spotify, Apple
                  Music, and more.
                </Typography>

                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.5)',
                    }}
                  >
                    Get Started Free
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 500,
                  width: '100%',
                  perspective: '1000px',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: 280,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#1db954', // Spotify Greenish
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    transform: 'rotateY(-10deg) rotateX(5deg)',
                    animation: `${float} 6s ease-in-out infinite`,
                    animationDelay: '0s',
                    zIndex: 1,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <AudiotrackIcon /> <Typography fontWeight={600}>Spotify</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.3)',
                      borderRadius: 1,
                      mb: 1,
                      width: '80%',
                    }}
                  />
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      borderRadius: 1,
                      mb: 1,
                      width: '60%',
                    }}
                  />
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      borderRadius: 1,
                      width: '90%',
                    }}
                  />
                </Box>

                {/* Floating Card 2 (Front) */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '30%',
                    left: '10%',
                    width: 300,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: '#fa2d48', // Apple Colorish
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                    transform: 'rotateY(10deg) rotateX(5deg)',
                    animation: `${float} 7s ease-in-out infinite`,
                    animationDelay: '1s',
                    zIndex: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <AppleIcon /> <Typography fontWeight={600}>Music</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.4)',
                      borderRadius: 1,
                      mb: 1,
                      width: '100%',
                    }}
                  />
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      borderRadius: 1,
                      mb: 1,
                      width: '70%',
                    }}
                  />
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      borderRadius: 1,
                      mb: 3,
                      width: '85%',
                    }}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#fa2d48',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                    }}
                  >
                    Transfer Complete
                  </Button>
                </Box>

                {/* Transfer Arrow */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '45%',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    animation: `${float} 5s ease-in-out infinite`,
                  }}
                >
                  <ArrowForwardIcon color="action" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      p: 2,
      borderRadius: 4,
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
        borderColor: 'transparent',
      },
    }}
  >
    <CardContent>
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: 'rgba(0,0,0,0.03)',
          width: 'fit-content',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
        {desc}
      </Typography>
    </CardContent>
  </Card>
);

export default LandingPage;
