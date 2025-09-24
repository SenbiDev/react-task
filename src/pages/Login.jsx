import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"  // ⬅️ pastikan path ini benar
import AuthForm from "../components/AuthForm"

export default function Login() {
  const login = useAuthStore((state) => state.login)
  const register = useAuthStore((state) => state.register)
  const isLoading = useAuthStore((state) => state.isLoading)
  const navigate = useNavigate()

  // state lokal untuk form
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setPassword2("")
  }

  const handleLogin = async () => {
    setError("")
    try {
      const loggedInUser = await login(username, password)
      if (loggedInUser) {
        resetForm()
        navigate("/app/artikel-api")
      }
    } catch (err) {
      setError(err.message || "Login gagal")
    }
  }

  const handleRegister = async () => {
    setError("")
    if (password !== password2) {
      setError("Password tidak sama")
      return
    }
    try {
      const newUser = await register(username, email, password, password2)
      if (newUser) {
        resetForm()
        alert("Registrasi berhasil, silakan login")
        setIsRegister(false)
      }
    } catch (err) {
      setError(err.message || "Register gagal")
    }
  }

  return (
    <AuthForm
      isRegister={isRegister}
      setIsRegister={setIsRegister}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      password2={password2}
      setPassword2={setPassword2}
      onLogin={handleLogin}       // ⬅️ tanpa event
      onRegister={handleRegister} // ⬅️ tanpa event
      error={error}
      isLoading={isLoading}
    />
  )
}