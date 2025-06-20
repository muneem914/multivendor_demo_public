

import ProtectedRoute from '@/components/common/ProtectedRoutes';
import DashboardProvider from './DashboardProvider';


export const metadata = {
  title: 'Customer Dashboard',
  description: 'Customer dashboard for managing orders of a customer and tracking order.',
};



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['customer']}>
    <DashboardProvider>
      {children}
    </DashboardProvider>
    </ProtectedRoute>
  );
}