export const metadata = {
  title: {
    default: 'Modules | PPMS',
    template: '%s | Modules | PPMS',
  },
  description: 'PPMS Modules',
};

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
