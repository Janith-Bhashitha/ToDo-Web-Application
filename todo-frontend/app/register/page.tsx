"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		console.log("Register:", { firstName, lastName, email, password });
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
			{/* Left purple panel */}
			<div className="hidden lg:flex lg:w-[35%] bg-gradient-to-b from-purple-500 to-purple-600 text-white flex-col justify-center items-center px-8 py-12 rounded-r-3xl">
				<div className="text-center space-y-6">
					{/* Logo */}
					<div className="flex items-center justify-center gap-3">
						<div className="w-16 h-16 border-4 border-white rounded-2xl flex items-center justify-center bg-white/10">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="2" y="2" width="20" height="20" rx="3" stroke="white" strokeWidth="2" />
								<path d="M7 12l3 3 5-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						<h1 className="text-5xl font-bold">ToDo.</h1>
					</div>
					
					{/* Divider */}
					<div className="h-1 w-20 bg-white/40 mx-auto"></div>
					
					{/* Tagline */}
					<p className="text-lg font-light">Stay organized, get things done</p>
				</div>
			</div>

			{/* Right side - Form */}
			<div className="w-full lg:w-[65%] flex items-center justify-center p-6 sm:p-8 lg:p-12">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg">
						{/* Header */}
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
							Create an Account
						</h2>

						{/* Form */}
						<form className="space-y-5" onSubmit={handleSubmit}>
							{/* First Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									placeholder="Enter your first name"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
									required
								/>
							</div>

							{/* Last Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									placeholder="Enter your last name"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
									required
								/>
							</div>

							{/* Email */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
									required
								/>
							</div>

							{/* Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
								<div className="relative">
									<input
										type={passwordVisible ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter your password"
										className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setPasswordVisible(!passwordVisible)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label="Toggle password visibility"
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											{passwordVisible ? (
												<path d="M3 3l18 18M9.88 9.88a3 3 0 1 0 4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											) : (
												<>
													<path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													<circle cx="12" cy="12.46" r="2.5" stroke="currentColor" strokeWidth="1.5" />
												</>
											)}
										</svg>
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
								<div className="relative">
									<input
										type={confirmVisible ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder="Confirm your password"
										className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setConfirmVisible(!confirmVisible)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label="Toggle confirm password visibility"
									>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											{confirmVisible ? (
												<path d="M3 3l18 18M9.88 9.88a3 3 0 1 0 4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											) : (
												<>
													<path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													<circle cx="12" cy="12.46" r="2.5" stroke="currentColor" strokeWidth="1.5" />
												</>
											)}
										</svg>
									</button>
								</div>
							</div>

							{/* Create Account Button */}
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full text-lg transition duration-200 mt-8"
							>
								Create Account
							</button>
						</form>

						{/* Login Link */}
						<p className="text-center text-gray-700 text-sm mt-6">
							Already have an account?{' '}
							<Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
