"use client";

import Link from "next/link";
import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "@components/theme";
import { Button } from "@components/ui/button";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          spacing={1}
        >
          <Grid item xs>
            <Link href="/query" passHref>
              <Button className="w-[300px]">Quick query</Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/chat" passHref>
              <Button className="w-[300px]">Chat</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
