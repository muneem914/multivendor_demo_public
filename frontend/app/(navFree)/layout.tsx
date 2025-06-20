export const metadata = {
  title: 'Authentication - Fourbtech',
  description: 'Login or register to buy goods and manage your inventory.',
};



export default function NavFreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}