export default function UserSession(token, {name, email}){
    sessionStorage.setItem("caminhoDaLuz-name", name)
    sessionStorage.setItem("caminhoDaLuz-email", email)
    sessionStorage.setItem("caminhoDaLuz-token", token)

}