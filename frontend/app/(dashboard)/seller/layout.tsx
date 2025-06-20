

import ProtectedRoute from '@/components/common/ProtectedRoutes';
import DashboardProvider from './DashboardProvider';


export const metadata = {
  title: 'Seller Dashboard',
  description: 'Seller dashboard for managing all products and orders for a particular seller.',
};



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['seller']}>
    <DashboardProvider>
      {children}
    </DashboardProvider>
    </ProtectedRoute>
  );
}