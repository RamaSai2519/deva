import { HoveredMenuProvider } from './hoveredMenuContext';
import { AuthProvider } from './AuthContext';

const AppProviders = ({ children }) => (
    <AuthProvider>
        <HoveredMenuProvider>
            {children}
        </HoveredMenuProvider>
    </AuthProvider>
);

export default AppProviders;