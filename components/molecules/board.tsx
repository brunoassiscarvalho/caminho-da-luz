import { Divider, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Board {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function Board({ title, children, footer }: Board) {
  return (<Paper>
    <Grid container>
      <Grid item xs={12}>
        <Typography>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        {footer}
      </Grid>
    </Grid>
  </Paper>)
}