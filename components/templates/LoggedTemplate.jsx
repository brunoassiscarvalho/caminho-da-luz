import PageHeader from '../organisms/PageHeader'
import { Box } from '@mui/material'


export default function LoggedTemplate({ children }) {
  return (
    <>
      <PageHeader />
      <Box margin={5}>
        {children}
      </Box>
    </>
  )
}