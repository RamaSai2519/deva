// Navigation service to handle programmatic navigation from non-component files
let navigate = null;

export const setNavigate = (navigateFunction) => {
    navigate = navigateFunction;
};

export const navigateTo = (path) => {
    if (navigate) {
        navigate(path);
    } else {
        // Fallback to window.location if navigate is not set
        window.location.href = path;
    }
};
