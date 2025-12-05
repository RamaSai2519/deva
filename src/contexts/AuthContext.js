import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAuthStatus = () => {
        try {
            const token = localStorage.getItem('access_token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAuthenticated(false);
        }
    };

    const login = (accessToken, refreshToken, userId, isAdmin) => {
        try {
            localStorage.setItem('user_id', userId);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('is_admin', isAdmin ? 'true' : 'false');
            setIsAuthenticated(true);
            setIsAdmin(isAdmin);
        } catch (error) {
            console.error('Error storing auth data:', error);
            throw error;
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('is_admin');
            setIsAuthenticated(false);
            setIsAdmin(false);
            window.location.href = '/login';
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
