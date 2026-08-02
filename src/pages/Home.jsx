import Hero from '../components/Hero/Hero';
import QuickAccess from '../components/QuickAccess/QuickAccess';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Benefits from '../components/Benefits/Benefits';
import News from '../components/News/News';
import Partners from '../components/Partners/Partners';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <About />
      <Services />
      <Benefits />
      <News />
      <Partners />
      <FAQ />
      <Contact />
    </>
  );
}
