import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decodedToken.exp < currentTime) {
            // Token has expired
            localStorage.removeItem('jwtToken');
            return false;
        }

        return true;
    } catch (error) {
        // Invalid token
        localStorage.removeItem('jwtToken');
        return false;
    }
};

export const Logout = () => {
    localStorage.removeItem('jwt_token');
};
