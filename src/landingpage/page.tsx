
import Dashboard from './dashboard/page'
import Hero from './hero/page'
import Header from './header/page'
import Features from './features/page'
import { CTA } from './cta/page'
import { Testimonials } from './testimonial/page'
import { Stats } from './stats/page'
import { Footer } from './footer/page'

const Landingpage = () => {
  return (
    <><Header />
    <Hero />
    <Dashboard />
    <Features />
    <CTA />
    <Testimonials />
    <Stats />
    <Footer /></>
  )
}

export default Landingpage;