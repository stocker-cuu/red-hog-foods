import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Flavors from '@/components/Flavors';
import About from '@/components/About';
import HowToBuy from '@/components/HowToBuy';
import Cart from '@/components/Cart';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Wholesale from '@/components/Wholesale';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Flavors />
      <About />
      <HowToBuy />
      <Cart />
      <Testimonials />
      <FAQ />
      <Wholesale />
      <Footer />
    </main>
  );
}
