import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Loader } from "./components/layout/Loader";
import { Cursor } from "./components/layout/Cursor";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  // Lock scroll while loader is up so the hero entry plays from the top
  useEffect(() => {
    if (loaderDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loaderDone]);

  return (
    <ThemeProvider>
      <Loader onDone={() => setLoaderDone(true)} />
      <SmoothScroll>
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
