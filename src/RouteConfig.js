

import Login from "./pages/login/login";
import Main from "./pages/main";
import Transaction from "../src/pages/transaction"
import ParticipantForm from "./pages/participant/participantForm"
import ParticipantList from "./pages/participant/participantList"

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
                
                path: "/main",
                component: Transaction,
                routes: [
                    {
                        exact: true,
                        name: "Lista",
                        path: "/main",
                        component: ParticipantList
                    },
                    {
                        exact: true,
                        name: "Lista",
                        path: "/main/new-participant",
                        component: ParticipantForm
                    },
                    {
                        exact: true,
                        name: "Lista",
                        path: "/main/participant-detail/:id_participant",
                        component: ParticipantForm
                    },
                ]
            },           
        ]
    },
];