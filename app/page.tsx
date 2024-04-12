"use client";
import Link from "next/link";
import { Box, Button, Container, Grid, ThemeProvider } from "@mui/material";
import theme from "@providers/theme";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          spacing={1}
        >
          <Grid item xs>
            <Link href="/query" passHref>
              <Button variant="contained" color="primary" sx={{ width: 300 }}>
                Quick query
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/chat" passHref>
              <Button variant="contained" color="primary" sx={{ width: 300 }}>
                Chat
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
