const API_BASE = "http://localhost:8000/api"; // alamat backend Django kamu

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login gagal");
  }

  return await response.json();
};

export const registerUser = async (newUser) => {
  const response = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Register gagal");
  }

  return await response.json();
};

export async function logout() {
  localStorage.removeItem("token");
  return true;
}

