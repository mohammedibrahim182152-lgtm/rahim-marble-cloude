import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InquiryPopup from "@/components/ui/InquiryPopup";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <InquiryPopup />
      <WhatsAppButton />
    </>
  );
}
