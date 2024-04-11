'use client'
import Link from 'next/link'
import { Button, Container, Grid, ThemeProvider } from '@mui/material'
import theme from '@providers/theme'

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className="flex h-screen flex-col items-center justify-center border"
      >
        <Grid item className="border">
          <Link href="/query" passHref>
            <Button variant="contained" color="primary" sx={{ width: 300 }}>
              Quick query
            </Button>
          </Link>
        </Grid>
        <Grid item className="border">
          <Link href="/chat" passHref>
            <Button variant="contained" color="primary" sx={{ width: 300 }}>
              Chat
            </Button>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Home
