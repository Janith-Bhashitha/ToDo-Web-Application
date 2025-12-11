"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

// Zod validation schema
const registerSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const login = useAuthStore((state) => state.login);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setError("");
		setIsLoading(true);

		try {
			const response = await authApi.register({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
			});

			// Auto-login after registration
			login(
				{
					userId: response.userId,
					email: response.email,
					firstName: response.firstName,
					lastName: response.lastName,
				},
				response.accessToken,
				response.refreshToken
			);

			router.push('/AllTasks');
		} catch (err: any) {
			setError(err.response?.data?.error || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
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

						{/* Error Message */}
						{error && (
							<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
								{error}
							</div>
						)}

						{/* Form */}
						<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
							{/* First Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
								<input
									type="text"
									{...register("firstName")}
									placeholder="Enter your first name"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
								)}
							</div>

							{/* Last Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
								<input
									type="text"
									{...register("lastName")}
									placeholder="Enter your last name"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
								)}
							</div>

							{/* Email */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
								<input
									type="email"
									{...register("email")}
									placeholder="Enter your email"
									className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
								)}
							</div>

							{/* Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
								<div className="relative">
									<input
										type={passwordVisible ? "text" : "password"}
										{...register("password")}
										placeholder="Enter your password"
										className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-10"
									/>
									<button
										type="button"
										onClick={() => setPasswordVisible(!passwordVisible)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label="Toggle password visibility"
									>
										👁
									</button>
								</div>
								{errors.password && (
									<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
								)}
							</div>

							{/* Confirm Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
								<div className="relative">
									<input
										type={confirmVisible ? "text" : "password"}
										{...register("confirmPassword")}
										placeholder="Confirm your password"
										className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-10"
									/>
									<button
										type="button"
										onClick={() => setConfirmVisible(!confirmVisible)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
										aria-label="Toggle confirm password visibility"
									>
										👁
									</button>
								</div>
								{errors.confirmPassword && (
									<p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
								)}
							</div>

							{/* Create Account Button */}
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full text-lg transition duration-200 mt-8 disabled:opacity-50"
							>
								{isLoading ? "Creating Account..." : "Create Account"}
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