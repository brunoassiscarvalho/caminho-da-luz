import { createTheme, Theme } from '@mui/material/styles'
import { blue, lightGreen, grey } from "@mui/material/colors";
import { ptBR } from '@mui/material/locale';


const myTheme:Theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
              variant: "contained",              
            }
          },
    },
    palette: {
        primary: {
            main: blue[600]
        },
        secondary: {
            main: lightGreen[700]
        },
        
        background: {
            default: grey[100]
        },


    },

    typography: {
        h5: {
            color: blue[600],           
        }
    }

}, ptBR);

export default myTheme;
