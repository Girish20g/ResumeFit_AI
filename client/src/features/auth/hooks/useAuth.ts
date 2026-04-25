import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getUser, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data = await login(email, password);
            setUser(data.user);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username: string, email: string, password: string) => {
        setLoading(true);
        try {
            const data = await register(username, email, password);
            setUser(data.user);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);

        try {
            const data = await logout();
            setUser(null);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            const data = await getUser();
            setUser(data.user);
            setLoading(false);
        }
        getAndSetUser();
    }, []);

    return { user, loading, handleLogin, handleRegister, handleLogout }
}