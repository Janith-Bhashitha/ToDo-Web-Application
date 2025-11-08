"use client";

import { useState } from "react";
import Link from "next/link";

//ICON COMPONENTS (SVGs)

const LogoIcon = () => (
  <svg width="80" height="80" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="90" height="90" rx="9" fill="#7C3AED" stroke="none" strokeWidth="2" strokeLinejoin="bevel"/>
    <g clipPath="url(#clip0_214_39)">
    <path d="M83 40.9V75.6667C83 77.8768 82.122 79.9964 80.5592 81.5592C78.9964 83.122 76.8768 84 74.6667 84H16.3333C14.1232 84 12.0036 83.122 10.4408 81.5592C8.87797 79.9964 8 77.8768 8 75.6667V17.3333C8 15.1232 8.87797 13.0036 10.4408 11.4408C12.0036 9.87797 14.1232 9 16.3333 9H67.7667M33 42.3333L45.5 54.8333L87.1667 13.1667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_214_39">
    <rect width="82" height="77" fill="white" transform="translate(7 8)"/>
    </clipPath>
    </defs>
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path d="M23.8549 12.2755C23.8549 11.4598 23.7878 10.6397 23.6446 9.83716H12.1665V14.4581H18.7395C18.4667 15.9485 17.5904 17.2669 16.307 18.1046V21.1029H20.2285C22.5313 19.0129 23.8549 15.9265 23.8549 12.2755Z" fill="#4285F4"/>
    <path d="M12.1665 24C15.4486 24 18.2164 22.9373 20.2329 21.103L16.3115 18.1046C15.2205 18.8366 13.812 19.2511 12.171 19.2511C8.99628 19.2511 6.30448 17.139 5.33865 14.2994H1.29199V17.3903C3.3578 21.4426 7.56543 24 12.1665 24Z" fill="#34A853"/>
    <path d="M5.33421 14.2994C4.82447 12.809 4.82447 11.1952 5.33421 9.70484V6.61389H1.29204C-0.433935 10.0047 -0.433935 13.9995 1.29204 17.3902L5.33421 14.2994Z" fill="#FBBC04"/>
    <path d="M12.1665 4.74893C13.9014 4.72248 15.5782 5.36623 16.8347 6.54794L20.309 3.12188C18.1091 1.08477 15.1892 -0.0351984 12.1665 7.6241e-05C7.56541 7.6241e-05 3.3578 2.55749 1.29199 6.61408L5.33417 9.70503C6.29552 6.86099 8.9918 4.74893 12.1665 4.74893Z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 5.3731 18.6268 0 12 0C5.3731 0 0 5.3731 0 12C0 17.989 4.38762 22.9537 10.1252 23.855V15.4696H7.07748V12H10.1252V9.35562C10.1252 6.34842 11.9173 4.68622 14.6579 4.68622C15.9707 4.68622 17.3443 4.92077 17.3443 4.92077V7.87398H15.8307C14.3406 7.87398 13.8748 8.79875 13.8748 9.7488V11.9999H17.2025L16.671 15.4695H13.8747V23.8548C19.6123 22.9553 23.9998 17.9907 23.9998 11.9999L24 12Z" fill="#1977F3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.6711 15.4694L17.2027 11.9999H13.875V9.74876C13.875 8.80037 14.339 7.87394 15.8308 7.87394H17.3446V4.92072C17.3446 4.92072 15.971 4.68616 14.658 4.68616C11.9175 4.68616 10.1254 6.34672 10.1254 9.35557V12H7.07764V15.4695H10.1254V23.855C10.7362 23.951 11.3623 24 12.0002 24C12.6381 24 13.2641 23.9493 13.875 23.855V15.4695H16.6712L16.6711 15.4694Z" fill="#FEFEFE"/>
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    console.log("Login submitted:", { username, password, remember });
    };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans">
      
      <div className="hidden w-full flex-col items-center justify-center rounded-r-3xl bg-[#7C3AED] p-12 lg:flex lg:w-[35%]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center space-x-4">
            <LogoIcon />
          </div>
          <h1 className="text-6xl font-bold text-white">ToDo.</h1>
          <p className="mt-2 text-xl text-indigo-100">
            Stay organized, get things done
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-[65%]">
        
        {/* Form  */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg">
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="rounded-lg bg-indigo-50 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7C3AED" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Welcome to TaskFlow
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Sign in to manage your tasks
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Username Field */}
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>

              {/* Remember Me / Forgot Password Row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Remember me
                  </span>
                </label>
                
                <Link href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-base transition duration-200"
              >
                Login
              </button>
            </form>

            {/* Separator */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="mx-4 flex-shrink text-sm text-slate-500">Or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 h-11 px-4 py-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition"
              >
                <GoogleIcon />
                <span className="text-sm font-medium text-slate-700">Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 h-11 px-4 py-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition"
              >
                <FacebookIcon />
                <span className="text-sm font-medium text-slate-700">Facebook</span>
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-slate-600 mt-8">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}