import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';
import { Input, Button, Form, Spin, Alert } from 'antd';

const ProfileForm = ({ onSubmit, isLoading, errors, formData, handleChange, isPasswordVisible, togglePasswordVisibility }) => (
    <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Full Name" validateStatus={errors.name ? 'error' : ''} help={errors.name}>
            <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 custom-gradient-ring"
                aria-label="Full Name"
            />
        </Form.Item>
        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 custom-gradient-ring"
                aria-label="Email"
            />
        </Form.Item>
        <Form.Item label="New Password" validateStatus={errors.newPassword ? 'error' : ''} help={errors.newPassword}>
            <div className="relative">
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 custom-gradient-ring"
                    aria-label="New Password"
                />
                <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    aria-label="Toggle Password Visibility"
                >
                    {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
            </div>
        </Form.Item>
        <Form.Item label="Confirm New Password" validateStatus={errors.confirmPassword ? 'error' : ''} help={errors.confirmPassword}>
            <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 custom-gradient-ring"
                aria-label="Confirm New Password"
            />
        </Form.Item>
        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="w-full py-3 px-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                disabled={isLoading}
                aria-label="Update Profile"
            >
                {isLoading ? <Spin /> : 'Update Profile'}
            </Button>
        </Form.Item>
    </Form>
);

export function ProfilePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (formData.newPassword && formData.newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log("Profile updated successfully");
            } catch (error) {
                console.error("Profile update failed:", error);
                setErrors({ form: "Profile update failed. Please try again." });
            } finally {
                setIsLoading(false);
            }
        }   
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
                                <h1 className="text-2xl font-semibold mb-1">Your Profile</h1>
                                <p className="text-gray-400">Manage your account details</p>
                            </div>
                            {errors.form && <Alert message={errors.form} type="error" showIcon />}
                            <ProfileForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                errors={errors}
                                formData={formData}
                                handleChange={handleChange}
                                isPasswordVisible={isPasswordVisible}
                                togglePasswordVisibility={togglePasswordVisibility}
                            />
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white">Account Activity</h3>
                                <div className="text-sm text-gray-400">
                                    <p>Last login: December 7, 2024, 7:30 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;