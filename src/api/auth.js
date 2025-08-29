const API_URL = "http://127.0.0.1:8000";

// await fetch("http://127.0.0.1:8000/api/login/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: "rizaladt", password: "abcd1234" }),
//     });

// const api = axios.create({
//     baseURL: API_URL,
//     headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config
// });

// api.interceptors.respone.use(
//     (res) => res,
//     async (error) => {
//         const originalRequst = error.config;
//         if(error.respone?.status === 401 && !originalRequst._retry) {
//             originalRequst._retry = true;
//             try{
//                 const refresh = localStorage.getItem("refresh");
//                 const res = await axios.post(`${API_URL}/token/refresh/`, {refresh});

//                 localStorage.setItem("access", res.data.request);

//                 api.default.headers.common.Authorization = `Bearer ${res.data.request}`;
//                 originalRequst.headers.Authorization = `Bearer ${res.data.request}`;

//                 return api(originalRequst);
//             }catch (err){
//                 logout();
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export async function login(username, password) {
//     const res = await api.post("login/", {username, password});
//     localStorage.setItem("access", res.data.access)
//     localStorage.setItem("refresh", res.data.refresh)
//     return res.data;
// }
// export async function register(data) {
//     const res = await api.post("register/", data);
//     return res.data;
// }

// export async function logout() {
//     localStorage.setItem("access")
//     localStorage.setItem("refresh")
//     window.location.href = "/login"
// }


export async function login(username, password) {
    const res = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("Login respone", data)

    if (!res.ok){
        throw new Error("Login gagal");
    }

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return data;
}

export async function register(data) {
    const res = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Registrasi gagal");
    return res.json();
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error();

    const res = await fetch(`${URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({refresh}),
    });
    if (!res.ok) throw new Error("Refresh gagal");
    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
}

export function logout(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href="/login";
}