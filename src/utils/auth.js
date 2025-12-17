import { message } from "antd";
import Raxios from "../services/axiosHelper";

const login = (accessToken, refreshToken, userId) => {
    try {
        localStorage.setItem('user_id', userId);
        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    } catch (error) {
        console.error('Error storing auth data:', error);
        throw error;
    }
};

const logout = () => {
    try {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_logged_in');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

const getUserAcessLevel = async () => {
    try {
        const response = await Raxios.get('/user', { params: { user_id: localStorage.getItem('user_id') } });
        if (response.status === 200) {
            return response.data.user_type;
        } else {
            await message.error(response.msg || "Failed to fetch user access level");
            logout();
        }
    } catch (error) {
        await message.error("An error occurred while fetching user access level");
        logout();
    }
}

const checkAccess = async (requiredLevel, redirectPath = '/account') => {
    const accessLevel = await getUserAcessLevel();
    if (accessLevel !== requiredLevel) {
        window.location.href = redirectPath;
    }
};

export { login, logout, getUserAcessLevel, checkAccess };