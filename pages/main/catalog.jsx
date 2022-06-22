import { Grid, Card, Typography, CardContent, CardActions, Button } from '@mui/material'
import LoggedTemplate from '../../components/templates/LoggedTemplate'
import React from 'react'
import { useRouter } from 'next/router'


const data = [
  { name: "Item1", value: 100.0, },
  { name: "Item2", value: 200.0, },
  { name: "Item3", value: 300.0, }
]

export default function Catalog() {
  const router = useRouter()
  return (
    <Grid container spacing={3}>
      {data.map(({name, value}) =>
        <Grid item xs={2} key={name}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>             
              <Typography variant="h5" component="div">
              {name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {value}
              </Typography>              
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => router.push(`/main/product/${name}`)} >Detalhes</Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

Catalog.getLayout = function getLayout(page) {
  return (
    <LoggedTemplate>
      {page}
    </LoggedTemplate>
  )
}