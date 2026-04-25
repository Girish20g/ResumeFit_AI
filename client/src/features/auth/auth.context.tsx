import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: (user: any) => { },
    loading: false,
    setLoading: (loading: boolean) => { }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}