import { createContext, useState, useEffect } from "react";
import { account, ID } from "../lib/appwrite/config"; // Assuming this is your Appwrite SDK configuration
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        PersistUser()
    }, [])

    useEffect(() => {
        if(error !== null) {
            const clearError = setTimeout(() => {
                setError(null)
            }, 5000)

            return () => clearTimeout(clearError)
        }
    }, [error])

    const PersistUser = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }
    }

    // User login function
    const Userlogin = async (userData) => {
        const { email, password } = userData
        setLoading(true);
        try {
            const session = await account.createEmailPasswordSession(email, password);
            // Optionally, you can set user data from session if needed
            const userData = await account.get();
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error('Error during login:', error.message);
            setLoading(false);
            setError(error.message);
        }
    };

    // User logout function
    const Userlogout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null); // Reset user state after logout
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    // User registration function
    const UserRegister = async (userData) => {
        const { email, password } = userData
        try {
            await account.create(ID.unique(), email, password);
            await Userlogin(userData); // Log in the user after registration
        } catch (error) {
            console.error('Error registering new user:', error.message);
            setError(error.message); // Set error state for registration issues
        }
    };

    const data = {
        user,           // Share current user state
        error,          // Share error state
        loading,        // Share loading state
        Userlogin,      // User login function
        Userlogout,     // User logout function
        UserRegister,   // User registration function
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
