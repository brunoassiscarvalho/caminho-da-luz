
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import LoggedTemplate from '../../../components/templates/LoggedTemplate'

export default function Product() {

  const router = useRouter()
  const { product, value } = router.query

  return (

    <Box>

      <Typography variant="h5" component="div">
        {product}
      </Typography>

    </Box>)
}

Product.getLayout = function getLayout(page) {
  return (
    <LoggedTemplate>
      {page}
    </LoggedTemplate>
  )
}