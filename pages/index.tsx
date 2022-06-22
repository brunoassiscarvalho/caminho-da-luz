import type { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Login from './login/login'
import LoggedTemplate from '../components/templates/LoggedTemplate'



export default function Home() {
  return < Login />

}



// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <LoggedTemplate>
//       {page}
//     </LoggedTemplate>
//   )
// }
