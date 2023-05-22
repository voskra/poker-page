import * as React from 'react';
import { Container, Typography, AppBar, Toolbar, Box } from '@mui/material';
import { BlindTimer } from './pages/BlindTimer';

export const App = React.memo(() => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" variant="h6">
          Poker page
        </Typography>
      </Toolbar>
    </AppBar>
    <Container>
      <Box sx={{ my: 2 }}>
        <BlindTimer />
      </Box>
    </Container>
  </>
));

App.displayName = nameof(App);
