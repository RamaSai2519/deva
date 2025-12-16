import TermsModal from './TermsModal';
import { login } from '../../utils/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import Raxios from '../../services/axiosHelper';
import ForgotPasswordModal from './ForgotPasswordModal';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';

export function AuthPage({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [form] = Form.useForm();

    const isSignupMode = location.pathname === '/signup';

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Reset form when switching modes
        form.resetFields();
        setGeneralError('');
    }, [location.pathname, form]);

    const getPasswordStrength = (password) => {
        if (!password || password.length === 0) return "";
        if (password.length < 8) return "Weak";
        if (password.length < 12) return "Medium";
        return "Strong";
    };

    const handleSubmit = async (values) => {
        setIsLoading(true);
        setGeneralError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isSignupMode) {
                const { agreeTerms, confirmPassword, ...payload } = values;
                payload.action = 'register';
                const response = await Raxios.post('/user_auth', payload);
                if (response.status !== 200) {
                    setGeneralError(response.msg || 'Signup failed. Please try again.');
                } else {
                    login(response.data.access_token, response.data.refresh_token, response.data.user._id, response.data.user.is_admin);
                    setIsAuthenticated(true);
                    navigate('/account');
                }
            } else {
                const payload = { ...values, action: 'login' };
                const response = await Raxios.post('/user_auth', payload);
                if (response.status !== 200) {
                    setGeneralError(response.msg || 'Login failed. Please try again.');
                } else {
                    login(response.data.access_token, response.data.refresh_token, response.data.user._id, response.data.user.is_admin);
                    setIsAuthenticated(true);
                    navigate('/account');
                }
            }
        } catch (error) {
            console.error(`${isSignupMode ? 'Signup' : 'Login'} failed:`, error);
            setGeneralError(`${isSignupMode ? 'Signup' : 'Login'} failed. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const passwordValidator = (_, value) => {
        if (isSignupMode && value && value.length < 8) {
            return Promise.reject(new Error('Password must be at least 8 characters'));
        }
        return Promise.resolve();
    };

    const confirmPasswordValidator = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords do not match'));
        },
    });

    const termsValidator = (_, value) => {
        if (isSignupMode && !value) {
            return Promise.reject(new Error('You must agree to the terms and conditions'));
        }
        return Promise.resolve();
    };

    return (
        <div className={`flex items-center justify-center md:p-4 ${isSignupMode ? "mt-10" : ""}`}>
            <div className="rounded-[32px] border border-gray-800 w-full overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="bg-gray-50 md:p-6 flex items-center justify-center relative">
                        <div className="absolute top-6 left-6">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-black/10 border border-black/20 flex items-center justify-center">
                                    <img
                                        src="Assets/images/githubLogo.png"
                                        alt="Epoch 4.0"
                                        className="h-5 w-5 object-contain opacity-70"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold tracking-wider uppercase text-gray-800">Epoch 4.0</span>
                                    <span className="text-[10px] text-gray-500">GitHub Community Club</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-[400px]">
                            <AnimatedScene mousePosition={mousePosition} isPasswordVisible={isPasswordVisible} />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 text-center">
                            <p className="text-sm text-gray-600">
                                Access your Epoch Coins & events
                            </p>
                        </div>
                    </div>
                    <div className="p-6 py-2 md:py-6 relative bg-black text-white">
                        <div className="md:space-y-8">
                            <div>
                                <h1 className="text-xl md:text-2xl font-semibold">
                                    {isSignupMode ? 'Join Epoch 4.0' : 'Welcome back to Epoch 4.0'}
                                </h1>
                                <p className="text-gray-400 mb-2">
                                    {isSignupMode ? 'Create your account to get started' : 'Log in to manage your events and Epoch Coins'}
                                </p>
                            </div>
                            {generalError && <Alert message={generalError} type="error" showIcon />}
                            <Form
                                form={form}
                                className="m-0"
                                onFinish={handleSubmit}
                                layout="vertical"
                                requiredMark={false}
                            >
                                {isSignupMode && (
                                    <Form.Item
                                        label={<span className="text-gray-300">Full Name</span>}
                                        name="name"
                                        rules={[{ required: true, message: 'Name is required' }]}
                                    >
                                        <Input
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                            autoFocus
                                        />
                                    </Form.Item>
                                )}

                                {isSignupMode && (
                                    <Form.Item
                                        label={<span className="text-gray-300">Email</span>}
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Email is required' },
                                            { type: 'email', message: 'Email is invalid' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                            autoFocus={!isSignupMode}
                                        />
                                    </Form.Item>
                                )}

                                <Form.Item
                                    label={<span className="text-gray-300">Registration Number (GITAM ID)</span>}
                                    name="reg_no"
                                    rules={[{ required: true, message: 'Registration Number is required' }]}
                                >
                                    <Input
                                        placeholder="Enter your GITAM registration number"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                        autoFocus={!isSignupMode}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-gray-300">Password</span>}
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Password is required' },
                                        { validator: passwordValidator }
                                    ]}
                                >
                                    <div className="relative">
                                        <Input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                            onChange={(e) => {
                                                if (isSignupMode) {
                                                    const strength = getPasswordStrength(e.target.value);
                                                    form.setFieldsValue({ passwordStrength: strength });
                                                }
                                            }}
                                        />
                                        <Button
                                            type="link"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                            icon={isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                            title={isPasswordVisible ? 'Hide password' : 'Show password'}
                                            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                                        />
                                    </div>
                                </Form.Item>

                                {isSignupMode && (
                                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.password !== currentValues.password}>
                                        {({ getFieldValue }) => {
                                            const password = getFieldValue('password');
                                            const strength = getPasswordStrength(password);
                                            return strength ? (
                                                <div className="-mt-6 mb-6">
                                                    <span className={`text-xs ${strength === 'Weak' ? 'text-red-500' :
                                                        strength === 'Medium' ? 'text-yellow-500' :
                                                            'text-green-500'
                                                        }`}>
                                                        {strength}
                                                    </span>
                                                </div>
                                            ) : null;
                                        }}
                                    </Form.Item>
                                )}

                                {isSignupMode && (
                                    <Form.Item
                                        label={<span className="text-gray-300">Confirm Password</span>}
                                        name="confirmPassword"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Please confirm your password' },
                                            confirmPasswordValidator
                                        ]}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                                        />
                                    </Form.Item>
                                )}


                                {isSignupMode && (
                                    <Form.Item
                                        name="agreeTerms"
                                        valuePropName="checked"
                                        rules={[{ validator: termsValidator }]}
                                    >
                                        <Checkbox className="text-gray-300">
                                            I agree to the{' '}
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-[#3533cd] underline"
                                            >
                                                Terms and Conditions
                                            </button>
                                        </Checkbox>
                                    </Form.Item>
                                )}

                                {/* Trust reassurance */}
                                <p className="text-xs text-gray-500 text-center -mt-4 mb-4">
                                    Official access for registered Epoch participants only.
                                </p>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isLoading}
                                        block
                                        className="w-full py-3 px-4 bg-[#3533cd] text-white rounded-lg hover:bg-[#2826a3] transition-colors h-auto"
                                    >
                                        {isLoading
                                            ? (isSignupMode ? 'Signing up...' : 'Logging in...')
                                            : (isSignupMode ? 'Sign up' : 'Log in')
                                        }
                                    </Button>
                                </Form.Item>
                                <div className='flex flex-col items-center justify-center gap-2'>
                                    {!isSignupMode && (
                                        <Button
                                            type="link"
                                            onClick={() => setIsForgotPasswordModalOpen(true)}
                                            className="text-gray-500 hover:text-gray-300 hover:underline p-0 text-xs"
                                        >
                                            Forgot password?
                                        </Button>
                                    )}
                                    <p className="text-center text-sm text-gray-400">
                                        {isSignupMode ? (
                                            <>
                                                Already have an account?{" "}
                                                <Link to="/login" className="text-white hover:underline font-medium">
                                                    Log in
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                Don't have an account?{" "}
                                                <Link to="/signup" className="text-white hover:underline font-medium">
                                                    Sign up
                                                </Link>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
            />
        </div>
    );
}

export default AuthPage;
