import axios from "axios";

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// adding the token to every single request (if it exists)
service.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
        config.headers.authorization = `Bearer ${authToken}`
    }
    return config
})

function handleSignup() {
    
}

export default service