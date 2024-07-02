import Footer from "./components/Footer";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
function App() {
  return (
    <div className='max-w-7xl p-2 mx-auto text-medium'>
      <div className='mt-32 md:mt-44' />
      <Introduction />
      <Projects />
      {/* <ContactMe /> */}
      <Footer />
    </div>
  );
}

export default App;
