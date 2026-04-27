import {RouterProvider} from"react-router";
import { router } from "./app.routes.tsx";
import { AuthProvider } from "./features/auth/auth.context.tsx";
import { ThemeProvider } from "./hooks/useTheme";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
