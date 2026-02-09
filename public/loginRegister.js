import { inputEnabled, setDiv} from "./index.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

let loginRegisterDiv = null

export function handleLoginRegister(){
    loginRegisterDiv = document.getElementById('logon-register')
    const login = document.getElementById('logon')
    const register = document.getElementById('register')

    loginRegisterDiv.addEventListener('click', (e) => {
        if(inputEnabled && e.target.nodeName === 'BUTTON'){
            if(e.target === login){
                showLogin()
            } else if(e.target === register){
                showRegister()
            }
        }
    })
}

export function showLoginRegister(){
    setDiv(loginRegisterDiv)
}