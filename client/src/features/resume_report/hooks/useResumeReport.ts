import { useContext } from "react";
import { getMyResumeReports, generateResumeFitReport, getReport, deleteReport, exportReport } from "../services/report.api"
import { ResumeReportContext } from "../resume_report.context";


export const useResumeReport = () => {
    const context = useContext(ResumeReportContext);
    if (!context) {
        throw new Error("useResumeReport must be used within ResumeReportProvider");
    }
    const { 
        loading, 
        setLoading, 
        error, 
        setError, 
        report, 
        setReport, 
        userReports, 
        setUserReports,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy
    } = context;

    const handleGenerateResumeFitReport = async ({
        jobDescription,
        selfDescription,
        resumeFile,
    }: {
        jobDescription: string;
        selfDescription: string;
        resumeFile: File | null;
    }) => {
        setLoading(true);
        try {
            const response = await generateResumeFitReport({
                jobDescription,
                selfDescription,
                resumeFile,
            })
            console.log(response);
            setReport(response.resumeReport);
            return response.resumeReport;
        } catch (error) {
            console.error("Error generating resume fit report:", error)
            setError(true);
            setReport(null);
        } finally {
            setLoading(false);
        }
    }

    const handleGetReport = async (reportId: string) => {
        setLoading(true);
        try {
            const response = await getReport(reportId)
            setReport(response.resumeReport);
            return response.resumeReport;
        } catch (error) {
            console.error("Error getting report:", error)
            setError(true);
            setReport(null);
        } finally {
            setLoading(false);
        }
    }

    const handleGetMyResumeReports = async () => {
        setLoading(true);
        try {
            const response = await getMyResumeReports()
            setUserReports(response.resumeReports);
            return response.resumeReports
        } catch (error) {
            console.error("Error getting my resume reports:", error)
            setError(true);
            setUserReports([]);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteReport = async (reportId: string) => {
        try {
            await deleteReport(reportId);
            // Remove from local state
            setUserReports(prev => prev.filter(report => report._id !== reportId));
            return true;
        } catch (error) {
            console.error("Error deleting report:", error);
            setError(true);
            return false;
        }
    }

    const handleExportReport = async (reportId: string, format: 'pdf' | 'json') => {
        try {
            const data = await exportReport(reportId, format);
            return data;
        } catch (error) {
            console.error("Error exporting report:", error);
            setError(true);
            return null;
        }
    }

    return {
        loading,
        setLoading,
        error,
        setError,
        report,
        userReports,
        setUserReports,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        handleGenerateResumeFitReport,
        handleGetReport,
        handleGetMyResumeReports,
        handleDeleteReport,
        handleExportReport,
    }
}
