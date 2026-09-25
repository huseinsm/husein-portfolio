import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Research />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
