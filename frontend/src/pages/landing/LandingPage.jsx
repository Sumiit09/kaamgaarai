import Navbar from './Navbar';
import {
  AnnouncementBar, TrustedBy, Statistics, Features, HowItWorks,
  Platforms, BusinessCategories, WhyKaamgaarAI, Testimonials,
  Pricing, FAQ, FinalCTA, Footer,
} from './Sections';
import Hero from './Hero';

const LandingPage = () => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar />
    <Navbar />
    <Hero />
    <TrustedBy />
    <Statistics />
    <Features />
    <HowItWorks />
    <Platforms />
    <BusinessCategories />
    <WhyKaamgaarAI />
    <Testimonials />
    <Pricing />
    <FAQ />
    <FinalCTA />
    <Footer />
  </div>
);

export default LandingPage;
