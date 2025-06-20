import Link from "next/link";


export default function AdminDashboardPage() {
  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
      <br />
      <h1 className="text-3xl font-bold mb-6">Manage your all users from here.</h1>
      <br />
      <h1 className="text-3xl font-bold mb-6">For now, you can check <Link className="text-red-600" href='/admin/sellers'>sellers</Link> and <Link className="text-red-600" href='/admin/customers'>customers</Link> page.</h1>
      <h1 className="text-xl font-bold mb-6">(within few days, I will complete these all routes.)</h1>

      
    </div>
    // </ProtectedRoute>
  );
}
