export function generateStaticParams() {
  return [{ id: 'electric-cryo-roller' }];
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
