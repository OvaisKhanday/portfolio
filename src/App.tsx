import "./App.css";
import Footer from "./components/Footer";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <div className='max-w-7xl overflow-hidden'>
      <div className='mt-32 md:mt-44' />
      {/* <Spotlight className='-top-40 left-0 md:left-60 md:-top-20 overflow-hidden' fill='white' /> */}
      <Introduction />
      <Projects />
      {/* <ContactMe /> */}

      <Footer />
    </div>
  );
}

export default App;
