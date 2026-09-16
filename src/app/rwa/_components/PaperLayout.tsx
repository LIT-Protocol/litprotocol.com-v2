import ProductHeader from '@/components/Platform/ProductHeader';

// Papers share the product navigation and retain their own references and ending.
export default function PaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProductHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative h-full min-h-[100vh] w-full"
      >
        {children}
      </main>
    </>
  );
}
