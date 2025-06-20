
import PublicRootLayout from "./PublicRootProvider";

export const metadata = {
  title: 'Fourbtech',
  description: 'Your Perfect Partner.',
};



export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicRootLayout>
      {children}
    </PublicRootLayout>

  );
}