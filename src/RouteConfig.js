import Login from "./pages/login/login";
import Main from "./pages/main";
import Transaction from "../src/pages/transaction"
import ParticipantForm from "./pages/participant/participantForm"
import ParticipantList from "./pages/participant/participantList"
import ParticipantDetail from "./pages/participant/participantDetail";
import EventForm from "./pages/events/eventForm";
import EventDetail from "./pages/events/eventDetail";
import EventGrid from "./pages/events/eventGrid";
import EventRegister from "./pages/events/eventRegister";
import FacilitiesGrid from "./pages/facilities/facilitiesGrid";
import EventParticipant from "./pages/events/eventParticipant";
import EventSelecParticipant from "./pages/events/eventSelecParticipant";

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
            component: FacilitiesGrid
          },
          {
            exact: true,
            name: "Lista",
            path: "/main/participant",
            component: ParticipantList,
            
          },
          {
            exact: true,
            name: "Lista",
            path: "/main/participant/new",
            component: ParticipantForm
          },
          {
            exact: true,
            name: "Lista",
            path: "/main/participant/list",
            component: ParticipantList
          },
          {
            exact: true,
            name: "Lista",
            path: "/main/participant/edit/:participantId",
            component: ParticipantForm
          },
          {
            exact: true,
            name: "Lista",
            path: "/main/participant/detail/:participantId",
            component: ParticipantDetail
          },
          {
            exact: true,
            name: "Eventos",
            path: "/main/event",
            component: EventGrid,            
          },
          {
            exact: true,
            name: "Eventos",
            path: "/main/event/new",
            component: EventForm,            
          },
          {
            exact: true,
            name: "Eventos",
            path: "/main/event/detail/:eventId",
            component: EventDetail,            
          },
          {
            exact: true,
            name: "Eventos",
            path: "/main/event/edit/:eventId",
            component: EventForm,            
          },
          {
            exact: true,
            name: "Eventos",
            path: "/main/event/participants/:eventId",
            component: EventParticipant,            
          },

          {
            exact: true,
            name: "Eventos",
            path: "/main/event/add-participant/:eventId",
            component: EventSelecParticipant,           
          },

          
          {
            exact: true,
            name: "Eventos",
            path: "/main/event/register/:eventId/:participantId",
            component: EventRegister,            
          },
          
          // ]
          // {
          //   exact: true,
          //   name: "Lista",
          //   path: "/main/new-participant",
          //   component: ParticipantForm
          // },
          // {
          //   exact: true,
          //   name: "Lista",
          //   path: "/main/edit-participant/:participantId",
          //   component: ParticipantForm
          // },
          // {
          //   exact: true,
          //   name: "Lista",
          //   path: "/main/participant-detail/:participantId",
          //   component: ParticipantDetail
          // },
          // {
          //   exact: true,
          //   name: "Lista",
          //   path: "/main/register-event/:participantId/:event",
          //   component: EventForm
          // },
        ]
      },
    ]
  },
];