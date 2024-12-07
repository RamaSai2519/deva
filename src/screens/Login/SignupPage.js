import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';
import avatars from './avatar.json';

const AvatarSelector = ({ options, selectedAvatar, onSelect }) => (
    <select
        value={selectedAvatar ? selectedAvatar.name : ''}
        onChange={(e) => onSelect(options.find(avatar => avatar.name === e.target.value))}
        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
    >
        <option value="">Select an avatar</option>
        {options.map((avatar) => (
            <option key={avatar.name} value={avatar.name}>
                {avatar.name}
            </option>
        ))}
    </select>
);

export function SignupPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        document.getElementById('name').focus();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
        if (!selectedAvatar) newErrors.avatar = "Please select an avatar";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log("Form submitted successfully", {
                    name,
                    email,
                    password,
                    avatar: selectedAvatar?.name
                });
            } catch (error) {
                console.error("Signup failed:", error);
                setErrors({ form: "Signup failed. Please try again." });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return "";
        if (password.length < 8) return "Weak";
        if (password.length < 12) return "Medium";
        return "Strong";
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-[1000px] overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="bg-gray-50 p-12 flex items-center justify-center">
                        <div className="w-full max-w-[400px]">
                            <AnimatedScene mousePosition={mousePosition} isPasswordVisible={isPasswordVisible} />
                        </div>
                    </div>
                    <div className="p-12 relative bg-black text-white">
                        <div className="absolute top-8 right-8">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-400">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
                                <p className="text-gray-400">Please enter your details</p>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-2 text-gray-300">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 text-gray-300">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm mb-2 text-gray-300">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                            aria-invalid={errors.password ? "true" : "false"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                        >
                                            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    <div className="mt-1">
                                        <span className={`text-xs ${getPasswordStrength() === 'Weak' ? 'text-red-500' : getPasswordStrength() === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {getPasswordStrength()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-300">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-300">Choose an Avatar</label>
                                    <AvatarSelector
                                        options={avatars}
                                        selectedAvatar={selectedAvatar}
                                        onSelect={setSelectedAvatar}
                                    />
                                    {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="agreeTerms"
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="h-4 w-4 text-[#3533cd] focus:ring-[#3533cd] border-gray-300 rounded"
                                    />
                                    <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-300">
                                        I agree to the{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(true)}
                                            className="text-[#3533cd] hover:underline"
                                        >
                                            Terms and Conditions
                                        </button>
                                    </label>
                                </div>
                                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
                                <div className="space-y-4">
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-[#3533cd] text-white rounded-lg hover:bg-[#2826a3] transition-colors flex items-center justify-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        {isLoading ? 'Signing up...' : 'Sign up'}
                                    </button>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-zinc-800"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-black px-2 text-gray-400">Or continue with</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full py-3 px-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Sign up with Google</span>
                                    </button>
                                </div>
                            </form>
                            <p className="text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-white hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default SignupPage;