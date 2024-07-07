import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import "./globals.css";
import { BackgroundBeamsDemo } from "@/components/bgBeam";
import Middle from "@/app/middle";
import Footer from "@/components/footer";

export default function Home() {
  const { userId } = auth();

  return (
    <main className="">
      <div className="pt-20">
        <BackgroundBeamsDemo />
      </div>
      <Middle />
      <Footer />
    </main>
  );
}
