

import ProtectedRoute from '@/components/common/ProtectedRoutes';
import DashboardProvider from './DashboardProvider';


export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing all customer and seller with all orders.',
};



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
    <DashboardProvider>
      {children}
    </DashboardProvider>
    </ProtectedRoute>
  );
}