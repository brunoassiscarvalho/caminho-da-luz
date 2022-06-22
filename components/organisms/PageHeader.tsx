import * as React from 'react';

import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';


export default function PageHeader() {
 console.log("rederizou pageheader");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <TextField/>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
