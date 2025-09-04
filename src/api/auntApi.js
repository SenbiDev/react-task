const API_URL = "http://127.0.0.1:8000/api/";

export async function registerUser(data) {
  const res = await fetch(`${API_URL}register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Registrasi gagal");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.detail || "Login gagal");

  return result ;
}

export async function logout() {
  localStorage.removeItem("token");
  return true;
}