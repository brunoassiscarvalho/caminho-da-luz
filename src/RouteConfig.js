

import Login from "./pages/login/login";
import Main from "./pages/main";
import Transaction from "../src/pages/transaction"
import ParticipantForm from "./pages/participant/participantForm"

export default [
    {
        path: "/",
        exact: true,
        name: "Login",
        component: Login
    },      
    {
        path: "/main",
        component: Main,
        name: "Página principal",
        routes: [
            {
                exact: true,
                path: "/main",
                component: Transaction,
                routes: [
                    {
                        exact: true,
                        name: "Lista",
                        path: "/main",
                        component: ParticipantForm
                    },
                ]
            },           
        ]
    },
];