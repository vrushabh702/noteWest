import About from '../Frontend/About';
import HowItWorks from '../Frontend/HowItWorks';
import Plan from '../Frontend/Plan';
import ContactUs from '../Frontend/ContactUs';
import Header from './Header';
import Footer from './Footer';
import MainImage from './mainImage';

function Home() {     
    return (                        
            <div class="d-flex flex-column flex-root font-fira-sans">
                <Header>
                    <MainImage />
                </Header>
                <About />                
                <HowItWorks />
                <Plan />
                <ContactUs />                
                <Footer />                
            </div>                
    );
}

export default Home;