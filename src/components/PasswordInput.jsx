import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  color = "blue", // warna tema (blue/purple)
}) {
  const [show, setShow] = useState(false);

  const focusColor =
    color === "purple"
      ? "focus:ring-purple-500 focus:border-purple-500"
      : "focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="relative w-full">
      {/* === Icon Lock === */}
      <Lock
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
        aria-hidden="true"
      />

      {/* === Input Field === */}
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className={`w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 
                    bg-gray-50 text-gray-900 placeholder-gray-400 
                    ${focusColor} focus:ring-2 focus:outline-none 
                    transition-all duration-200 text-sm`}
      />

      {/* === Show/Hide Button === */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 
                   p-1.5 rounded-md text-gray-400 hover:text-gray-600 
                   hover:bg-gray-100 focus:outline-none 
                   transition-all duration-150"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
      </button>
    </div>
  );
}