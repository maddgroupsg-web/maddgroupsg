import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProgrammesTransition from "@/components/ProgrammesTransition";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <ProgrammesTransition />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
