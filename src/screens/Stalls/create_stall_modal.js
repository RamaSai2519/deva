import { useState } from 'react';
import Raxios from '../../services/axiosHelper';
import { message } from 'antd';

const CreateStallModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })); }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Please enter stall name';
        }
        if (!formData.password) {
            newErrors.password = 'Please enter password';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await Raxios.post('/user_auth', {
                action: 'register',
                name: formData.name,
                password: formData.password,
                email: 'lsreeniv@gitam.in',
                user_type: 'stall'
            });
            if (response.status === 200) {
                message.success('User created successfully!');
                setFormData({ name: '', password: '' });
                onClose();
            } else {
                message.error(response.msg || 'Failed to create user');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', password: '' });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-lightBlack border border-mutedWhite rounded-xl w-[90%] max-w-[480px] relative shadow-lg">
                <button
                    className="absolute top-5 right-5 text-gray-600 hover:text-mutedWhite text-3xl leading-none w-8 h-8 flex items-center justify-center"
                    onClick={handleCancel}
                >
                    ×
                </button>

                <div className="px-10 pt-8 pb-6 border-b-2 border-black">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Stall Account</h2>
                    <p className="text-sm text-mutedWhite">Enter your details to set up a new stall account</p>
                </div>

                <form onSubmit={handleSubmit} className="px-10 py-8">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-xs font-semibold tracking-wide text-mutedWhite mb-2">
                            NAME
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter stall name"
                            className={`w-full px-4 py-3 text-sm border-2 rounded-md outline-none text-black transition-all ${errors.name
                                ? 'border-red-500'
                                : 'border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)]'
                                }`}
                        />
                        {errors.name && <span className="block text-red-500 text-xs mt-1">{errors.name}</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-xs font-semibold tracking-wide text-mutedWhite mb-2">
                            PASSWORD
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className={`w-full px-4 py-3 pr-12 text-sm border-2 text-black rounded-md outline-none transition-all ${errors.password
                                    ? 'border-red-500'
                                    : 'border-black focus:shadow-[0_0_0_3px_rgba(0,0,0,0.1)]'
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-mutedWhite"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    {showPassword ? (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                        {errors.password && <span className="block text-red-500 text-xs mt-1">{errors.password}</span>}
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            className="flex-1 px-6 py-3 text-sm font-semibold border-2 border-black rounded-md bg-red-600 text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 text-sm font-semibold border-2 border-black rounded-md bg-blue-600 text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStallModal;
