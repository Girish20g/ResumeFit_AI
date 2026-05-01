import React, { createContext, useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";

export interface ResumeReportContextType {
    report: any;
    setReport: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    userReports: any[];
    setUserReports: React.Dispatch<React.SetStateAction<any[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    sortBy: 'newest' | 'score' | 'oldest';
    setSortBy: React.Dispatch<React.SetStateAction<'newest' | 'score' | 'oldest'>>;
}

export const ResumeReportContext = createContext<ResumeReportContextType | undefined>(undefined);

export const ResumeReportProvider = ({ children }) => {
    const { } = useAuth();
    const [report, setReport] = useState(null);
    const [userReports, setUserReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'score' | 'oldest'>('newest');


    const value = {
        report,
        setReport,
        loading,
        setLoading,
        error,
        setError,
        userReports,
        setUserReports,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy
    }
    return (
        <ResumeReportContext.Provider value={value}>
            {children}
        </ResumeReportContext.Provider>
    )
}