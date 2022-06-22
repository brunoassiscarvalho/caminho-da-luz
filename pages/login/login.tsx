import { AccessibilityNew } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, Paper, TextField, } from "@mui/material";
import { useRouter } from 'next/router'


export default function Login() {
  const router = useRouter()

  function login(){
    
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'center' }}>
      <Paper sx={{ padding: 5, display: 'flex' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , maxWidth: 400}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar>
                  <AccessibilityNew />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Senha"></TextField>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => router.push('/main/catalog')}>
                Entrar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth>
                Esqueci a senha
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}