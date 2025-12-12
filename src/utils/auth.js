const login = (accessToken, refreshToken, userId, isAdmin) => {
    try {
        localStorage.setItem('user_id', userId);
        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('is_admin', isAdmin ? 'true' : 'false');
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
        localStorage.removeItem('is_admin');
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};


export { login, logout };