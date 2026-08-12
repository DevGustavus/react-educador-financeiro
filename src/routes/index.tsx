import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/Home/HomePage'
import { DashboardPage } from '../pages/Dashboard/DashboardPage'
import { FinancePage } from '../pages/Finance/FinancePage'
import { InvestmentsPage } from '../pages/Investments/InvestmentsPage'
import { EducationPage } from '../pages/Education/EducationPage'
import { ToolsPage } from '../pages/Tools/ToolsPage'
import { AIPage } from '../pages/AI/AIPage'
import { ProfilePage } from '../pages/Profile/ProfilePage'
import { GoalsPage } from '../pages/Goals/GoalsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'financas', element: <FinancePage /> },
      { path: 'investimentos', element: <InvestmentsPage /> },
      { path: 'educacao', element: <EducationPage /> },
      { path: 'ferramentas', element: <ToolsPage /> },
      { path: 'ia', element: <AIPage /> },
      { path: 'perfil', element: <ProfilePage /> },
      { path: 'metas', element: <GoalsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
