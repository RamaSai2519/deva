import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { message, Form, Input } from "antd";
import Raxios from "../../services/axiosHelper";
import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Hash, ArrowUpRight, ArrowDownRight, Wallet, Phone } from "lucide-react";

export function Account() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { logout } = useAuth();
    const [form] = Form.useForm();

    const fetchProfileData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await Raxios.get('/user', { params: { user_id: localStorage.getItem('user_id') } });
            if (response.status === 200) {
                setProfileData(response.data);
                form.setFieldsValue({
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber || '',
                    password: ''
                });
            } else {
                message.error('Failed to fetch profile data:', response.msg);
            }
        } catch (error) {
            message.error('An error occurred while fetching profile data.');
        } finally {
            setIsLoading(false);
        }
    }, [form]);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const handleEditToggle = () => {
        if (isEditing) {
            form.setFieldsValue({
                name: profileData.name,
                email: profileData.email,
                phoneNumber: profileData.phoneNumber || '',
                password: ''
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async (values) => {
        setIsSaving(true);
        try {
            const payload = {
                user_id: localStorage.getItem('user_id'),
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
            };

            // Only include password if it's provided
            if (values.password && values.password.trim() !== '') {
                payload.password = values.password;
            }

            const response = await Raxios.post('/user', payload);

            if (response.status === 200) {
                setProfileData({ ...profileData, ...values });
                setIsEditing(false);
                message.success('Profile updated successfully');
                // Refetch to get updated data
                fetchProfileData();
            } else {
                message.error(response.msg || 'Failed to update profile');
            }
        } catch (error) {
            message.error('An error occurred while updating profile.');
        } finally {
            setIsSaving(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) + ', ' + date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
                <p className="text-white text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
                <p className="text-white text-lg">No profile data available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8 pt-12 w-full">
            <div className="max-w-7xl h-full mx-auto">
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-4xl font-bold text-white mb-8">My Account <span className="text-mutedWhite text-lg">{profileData.is_admin ? "Admin" : ""}</span></h1>
                    {/* Recharge User Button */}
                    <div className="flex gap-4">
                        {profileData.is_admin && <button onClick={() => navigate('/users')} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Recharge User</button>}
                        <button onClick={logout} className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Logout</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Section */}
                    <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-white" />
                                <h2 className="text-xl font-semibold text-white">Profile</h2>
                            </div>
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Edit
                                <div className={`w-10 h-6 rounded-full transition-colors ${isEditing ? 'bg-white' : 'bg-gray-700'} relative cursor-pointer`}>
                                    <div className={`w-4 h-4 rounded-full absolute top-1 transition-transform ${isEditing ? 'bg-black translate-x-5' : 'bg-white translate-x-1'}`}></div>
                                </div>
                            </button>
                        </div>

                        {!isEditing ? (
                            <div className="space-y-6">
                                <div className="bg-lightBlack rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Full Name</p>
                                            <p className="text-base font-medium text-white">{profileData.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-lightBlack rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Email Address</p>
                                            <p className="text-base font-medium text-white">{profileData.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-lightBlack rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Hash className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Registration Number</p>
                                            <p className="text-base font-medium text-white">{profileData.reg_no}</p>
                                        </div>
                                    </div>
                                </div>

                                {profileData.phoneNumber && (
                                    <div className="bg-lightBlack rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                                                <p className="text-base font-medium text-white">{profileData.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Form
                                form={form}
                                onFinish={handleSaveChanges}
                                layout="vertical"
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="name"
                                    label={<span className="text-sm font-medium text-gray-300">Full Name</span>}
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input
                                        className="w-full px-4 py-3 bg-lightBlack border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                        placeholder="Enter your name"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label={<span className="text-sm font-medium text-gray-300">Email Address</span>}
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input
                                        className="w-full px-4 py-3 bg-lightBlack border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"
                                    label={<span className="text-sm font-medium text-gray-300">Phone Number</span>}
                                >
                                    <Input
                                        className="w-full px-4 py-3 bg-lightBlack border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label={<span className="text-sm font-medium text-gray-300">Password (leave blank to keep current)</span>}
                                >
                                    <Input.Password
                                        className="w-full px-4 py-3 bg-lightBlack border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                        placeholder="Enter new password"
                                    />
                                </Form.Item>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleEditToggle}
                                        disabled={isSaving}
                                        className="flex-1 bg-black text-white border border-gray-700 py-3 rounded-lg font-medium hover:bg-lightBlack transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )}
                    </div>

                    {/* Wallet Section */}
                    <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-8">
                            <Wallet className="w-5 h-5 text-white" />
                            <h2 className="text-xl font-semibold text-white">Wallet</h2>
                        </div>

                        {/* Balance Card */}
                        {!profileData.is_admin && <div className="bg-lightBlack rounded-2xl p-6 mb-6">
                            <p className="text-sm text-gray-400 mb-2">Current Balance</p>
                            <p className="text-4xl font-bold">${(profileData.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>}

                        {/* Recent Transactions */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-4">Recent Transactions</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {profileData.transactions && profileData.transactions.length > 0 ? (
                                    profileData.transactions.map((transaction, index) => {
                                        const effectiveAction = profileData.is_admin
                                            ? (transaction.action === 'add' ? 'remove' : 'add')
                                            : transaction.action;

                                        return (
                                            <div
                                                key={index}
                                                className="bg-lightBlack rounded-lg p-4 flex items-start justify-between hover:bg-gray-800 transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1">
                                                        {effectiveAction === 'add' ? (
                                                            <ArrowUpRight className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <ArrowDownRight className="w-5 h-5 text-red-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">
                                                            {effectiveAction === 'add' ? 'Credit' : 'Debit'}
                                                        </p>
                                                        <p className="text-sm text-gray-400">
                                                            by {profileData.is_admin ? transaction.user_name : transaction.admin_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-semibold ${effectiveAction === 'add' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {effectiveAction === 'add' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatTimestamp(transaction.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No transactions yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;