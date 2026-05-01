import axios from "axios";

const baseUrl = "http://localhost:3000";
const ResumeController = "api/resume";

const reportApi = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

interface ReportRequest{
    jobDescription: string;
    selfDescription?: string;
    resumeFile?: File | null;
}

export async function generateResumeFitReport({ jobDescription, selfDescription, resumeFile }: ReportRequest) {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        if (selfDescription) formData.append("selfDescription", selfDescription);
        if (resumeFile) formData.append("resume", resumeFile);

        const response = await reportApi.post(`/${ResumeController}/generate-resume-fit-report`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getReport(reportId: string) {
    try {
        const response = await reportApi.get(`/${ResumeController}/report/${reportId}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getMyResumeReports() {
    try {
        const response = await reportApi.get(`/${ResumeController}/reports`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteReport(reportId: string) {
    try {
        const response = await reportApi.delete(`/${ResumeController}/report/${reportId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function exportReport(reportId: string, format: 'pdf' | 'json') {
    try {
        if (format === 'pdf') {
            const response = await reportApi.get(`/${ResumeController}/report/${reportId}/export?format=pdf`, {
                responseType: 'blob'
            });
            // Create a download link for PDF
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${reportId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return { success: true };
        } else if (format === 'json') {
            // Fetch the report and export as JSON
            const reportResponse = await reportApi.get(`/${ResumeController}/report/${reportId}`);
            const jsonData = JSON.stringify(reportResponse.data.resumeReport, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${reportId}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return { success: true };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default reportApi;