import FrontAbout from '../Frontend/FrontAbout';
import FrontHowItWorks from '../Frontend/FrontHowItWorks';
import FrontPlan from '../Frontend/FrontPlan';
import FrontContactUs from '../Frontend/FrontContactUs';
import FrontHeader from './FrontHeader';
import FrontFooter from './FrontFooter';
import FrontMainImage from './FrontMainImage';
import { Helmet } from 'react-helmet';

function ComingSoon() {
    return (
        <div class="d-flex flex-column flex-root font-fira-sans">

            <Helmet>
                <title>Best Therapy Notes Software Online | Write Progress Notes for Mental Health Therapy</title>
                <meta name="description" content="Looking for the best therapy notes software? NoteNest offers easy templates for mental health therapy progress and counseling session notes. Simplify note-writing with our online tool." />
            </Helmet>

            <FrontHeader>
                <FrontMainImage />
            </FrontHeader>
            <FrontAbout />
            <FrontHowItWorks />
            <FrontPlan />
            <FrontContactUs />
            <FrontFooter />
        </div>
    );
}

export default ComingSoon;