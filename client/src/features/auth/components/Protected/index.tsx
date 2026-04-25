import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router';

type ProtectedProps = {
    children?: React.ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}

export default Protected;