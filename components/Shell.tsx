import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import VoucherPopup from "@/components/VoucherPopup";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <VoucherPopup />
    </>
  );
}
