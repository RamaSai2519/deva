import { HoveredMenuProvider } from './hoveredMenuContext';

const AppProviders = ({ children }) => (
    <HoveredMenuProvider>
        {children}
    </HoveredMenuProvider>
);

export default AppProviders;