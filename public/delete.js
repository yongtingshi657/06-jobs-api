import { enableInput, message, token } from "./index.js"
import { showJobs } from "./jobs.js"

export const deleteJob = async (jobId) => {
    enableInput(false)

    try {
    const response = await fetch(`/api/v1/jobs/${jobId}`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
        
    }) 

    const data = await response.json()
    if(response.status === 200){
        message.textContent = 'The entry is deleted'
        showJobs()
    } else {
        message.textContent = "The jobs entry was not found";
        showJobs();
    }
    } catch(error){
        console.log(error);
        message.textContent = "A communications error has occurred.";
        showJobs();
    }

     enableInput(true)
}