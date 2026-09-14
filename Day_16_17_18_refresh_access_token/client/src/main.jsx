import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './app/routes/AppRoute.jsx'
import { AuthProvider } from './app/context/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AppRoute />
    </AuthProvider>
)
