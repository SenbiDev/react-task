import { Mail, Lock, User, ArrowRight } from "lucide-react";
import PasswordInput from "./PasswordInput";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthForm({
  isRegister,
  setIsRegister,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
  handleLogin,
  handleRegister,
  error,
  isLoading,
}) {
  const { theme } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) handleRegister();
    else handleLogin();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #141414, #1f1f1f)"
            : "linear-gradient(135deg, #f3f6ff, #ffffff)",
        color: "var(--text-color)",
      }}
    >
      <div className="w-full max-w-md">
        {/* === HEADER === */}
        <Header isRegister={isRegister} />

        {/* === FORM CARD === */}
        <div
          className="rounded-2xl shadow-lg border p-8 transition-colors duration-300"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}

            {/* Username */}
            <InputField
              id="username"
              label="Username"
              icon={<User />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />

            {/* Email */}
            {isRegister && (
              <InputField
                id="email"
                label="Email Address"
                icon={<Mail />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            )}

            {/* Password */}
            <InputField
              id="password"
              label="Password"
              icon={<Lock />}
              component={PasswordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            {/* Confirm Password */}
            {isRegister && (
              <InputField
                id="password2"
                label="Confirm Password"
                icon={<Lock />}
                component={PasswordInput}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-btn w-full py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            >
              <span>{isRegister ? "Sign Up" : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* === SWITCH LOGIN/REGISTER === */}
          <SwitchAuth isRegister={isRegister} setIsRegister={setIsRegister} />

          {/* === DEMO INFO === */}
          <DemoInfo theme={theme} />
        </div>
      </div>
    </div>
  );
}

/* === HEADER === */
function Header({ isRegister }) {
  return (
    <div className="text-center mb-8">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md"
        style={{
          background: "linear-gradient(to right, var(--primary-color), #9254de)",
        }}
      >
        <span className="text-white font-bold text-2xl">A</span>
      </div>
      <h2
        className="text-3xl font-bold tracking-tight"
        style={{ color: "var(--text-color)" }}
      >
        {isRegister ? "Create Account" : "Welcome Back"}
      </h2>
      <p className="mt-2 text-sm opacity-80" style={{ color: "var(--text-color)" }}>
        {isRegister
          ? "Join us and start your journey"
          : "Sign in to continue to your dashboard"}
      </p>
    </div>
  );
}

/* === SWITCH LOGIN/REGISTER === */
function SwitchAuth({ isRegister, setIsRegister }) {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 text-sm">
        {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="link-button ml-1"
        >
          {isRegister ? "Login di sini" : "Register sekarang"}
        </button>
      </p>
    </div>
  );
}

/* === DEMO INFO === */
function DemoInfo({ theme }) {
  return (
    <div
      className="mt-6 p-4 rounded-lg border transition-colors duration-300"
      style={{
        backgroundColor:
          theme === "dark" ? "rgba(24, 39, 72, 0.4)" : "var(--hover-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <p
        className="text-sm font-medium mb-1"
        style={{ color: "var(--primary-color)" }}
      >
        Demo Credentials:
      </p>
      <p
        className="text-xs"
        style={{ color: "var(--text-color)", opacity: 0.9 }}
      >
        Email: any valid email
      </p>
      <p
        className="text-xs"
        style={{ color: "var(--text-color)", opacity: 0.9 }}
      >
        Password: minimum 8 characters
      </p>
    </div>
  );
}

/* === REUSABLE INPUT FIELD === */
function InputField({
  id,
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  component: Component,
  ...rest
}) {
  const InputComp = Component || "input";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: "var(--text-color)" }}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: "var(--text-color)", opacity: 0.6 }}
        >
          {icon}
        </div>
        <InputComp
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200"
          style={{
            backgroundColor: "var(--input-bg)",
            color: "var(--input-text)",
            borderColor: "var(--border-color)",
          }}
          {...rest}
        />
      </div>
    </div>
  );
}