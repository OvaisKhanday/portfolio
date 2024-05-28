import "./App.css";
import Footer from "./components/Footer";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Spotlight } from "./components/ui/Spotlight";

function App() {
  return (
    <div className='max-w-7xl'>
      <div className='mt-32 md:mt-44' />
      <Spotlight className='-top-40 left-0 md:left-96 md:-top-20' fill='white' />
      <Introduction />
      <Skills />
      <Projects />
      {/* <ContactMe /> */}

      <Footer />
    </div>
  );
}

export default App;
