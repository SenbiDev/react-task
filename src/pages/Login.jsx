import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import AuthForm from "../components/AuthForm"
import { message } from "antd"

export default function Login() {
  const { login, register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setForm({ username: "", email: "", password: "", password2: "" })
  }

  const handleLogin = async () => {
    setError("")
    try {
      const loggedInUser = await login(form.username, form.password)
      if (loggedInUser) {
        resetForm()
        message.success(`Selamat datang, ${loggedInUser.username}! 🎉`)
        navigate("/artikel-api")
      }
    } catch (err) {
      setError(err.message || "Login gagal")
    }
  }

  const handleRegister = async () => {
    setError("")
    if (form.password !== form.password2) {
      setError("Password tidak sama")
      return
    }
    try {
      const newUser = await register(
        form.username,
        form.email,
        form.password,
        form.password2
      )
      if (newUser) {
        resetForm()
        message.success("Registrasi berhasil, silakan login")
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
      username={form.username}
      setUsername={(val) => handleChange("username", val)}
      email={form.email}
      setEmail={(val) => handleChange("email", val)}
      password={form.password}
      setPassword={(val) => handleChange("password", val)}
      password2={form.password2}
      setPassword2={(val) => handleChange("password2", val)}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      error={error}
      isLoading={isLoading}
    />
  )
}