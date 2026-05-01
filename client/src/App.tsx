import { RouterProvider } from "react-router";
import { router } from "./app.routes.tsx";
import { AuthProvider } from "./features/auth/auth.context.tsx";
import { ThemeProvider } from "./hooks/useTheme";
import { ResumeReportProvider } from "./features/resume_report/resume_report.context.tsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeReportProvider>
          <RouterProvider router={router} />
        </ResumeReportProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
