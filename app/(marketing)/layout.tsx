import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OpeningLoaderProvider } from "@/components/loader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OpeningLoaderProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </OpeningLoaderProvider>
  );
}
