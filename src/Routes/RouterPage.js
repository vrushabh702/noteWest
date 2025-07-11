import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from '../Back/pages/home/Home'
import FrontHome from '../Frontend/Home'
import FrontComingSoon from '../Frontend/ComingSoon'
import Clinician from '../Back/pages/clinician/Clinician'
import AddClinician from '../Back/pages/clinician/AddClinician'
import ViewClinician from '../Back/pages/clinician/ViewClinician'
import Account from '../Back/pages/account/Account'
import AddAccount from '../Back/pages/account/AddAccount'
import Subscription from '../Back/pages/account/Subscription'
import ViewAccount from '../Back/pages/account/ViewAccount'
import AddClient from '../Back/pages/client/AddClient'
import Client from '../Back/pages/client/Client'
import ProgressNote from '../Back/pages/client/ProgressNote'
import FileManager from '../Back/pages/client/FileManager'
import ViewDetail from '../Back/pages/client/ViewDetail'
import MyProfile from '../Back/pages/other/userProfile/MyProfile'

import LoginComponent from '../Back/pages/auth/Login'
import RegisterComponent from '../Back/pages/auth/Register'
import NewPasswordComponent from '../Back/pages/auth/NewPassword'
import PageNotFound from '../Back/pages/other/PageNotFound'

import PrivacyPolicyComponent from '../Back/pages/auth/PrivacyPolicy'
import BusinessAgreementComponent from '../Back/pages/auth/BusinessAgreement'

import AuthRoute from './AuthRoute'
import { TourProvider } from '@reactour/tour';
import FAQ from '../Frontend/Static/FAQ'
import TermAndCondition from '../Frontend/Static/TermAndCondition'
import TermConditions from '../Back/pages/auth/TermConditions'
import Help from '../Frontend/Static/Help'
import About from '../Frontend/Static/About'
import Notes from '../Frontend/Static/Notes'
import Pricing from '../Frontend/Static/Pricing'
import Features from '../Frontend/Static/Features'
import Sitemap from '../Frontend/Static/Sitemap'

const steps = [
    {
        selector: '.tour__step-one',
        content: 'Thank you for choosing NoteNest to help you with your documentation needs! Please follow along for a quick tour of the platform. We promise it will be quick.',
    },
    {
        selector: '.tour__step-two',
        content: 'This is your dashboard, where you can see upcoming things to do and updates. Over here you can navigate the platform and access different sections.',
    },
    {
        selector: '.tour__step-three',
        content: 'Let’s begin by adding a little bit of your information. Go ahead and select Manage Clinicians.',
    },
    {
        selector: '.tour__step-three--one',
        content: 'If you work with other people, everyone using the platform will be listed here. If it is just you, you can use this section to update your information whenever you need to. Go ahead and select add clinician',
    },   
    {
        selector: '.tour__step-three--two',
        content: 'Great, start by making yourself the practice administrator. Then fill out your information and press submit when you are done. Don’t forget to fill out the “Signature” section. This is how your signature will appear on all of your documents. Then fill out your information and press submit when you are done. Don’t forget to fill out the “Signature” section. This is how your signature will appear on all of your documents.',
    },
    {
        selector: '.tour__step-three--three',
        content: 'If you need to add other providers, please select “Add Clinician,” and continue to add everybody you need to.',
    },
    {
        selector: '.tour__step-four',
        content: 'if not, head over to the Clients/Notes tab.',
    },
    {
        selector: '.tour__step-four--one',
        content: 'Welcome to your Client Portal. This is where you can add and view all of your clients, you can create new clients by clicking "add client".',
    },
    {
        selector: '.tour__step-four--two',
        content: 'Here you can create client by filling this form.',
    },  
    {
        selector: '.tour__step-four--three',
        content: 'You can come back and add as many clients as you need.',
    }   
  ]

export const authPrefix = '/auth';

export const AbortPage = { name: 'Abort Page', link: '*' };

/* Clinician Route Start */
export const clinician = { name: 'Clinician', link: authPrefix + '/clinician' };
export const addClinician = { name: 'Add Clinician', link: authPrefix + '/add-clinician' };
export const editClinician = { name: 'Edit Clinician', link: authPrefix + '/edit-clinician' };
export const viewClinician = { name: 'View Clinician', link: authPrefix + '/view-clinician' };
export const viewClinicianClient = { name: 'Clinician Client', link: authPrefix + '/clinician-client' };
/* Clinician Page End */

/* Account Route Start */
export const account = { name: 'Accounts', link: authPrefix + '/accounts' };
export const addAccount = { name: 'Add Accounts', link: authPrefix + '/add-account' };
export const editAccount = { name: 'Edit Accounts', link: authPrefix + '/edit-account/' };
export const subscription = { name: 'Subscription', link: authPrefix + '/subscription' };
export const viewAccount = { name: 'View Account', link: authPrefix + '/view-account/' };
/* Account Route End */

/* Clinet Route Start */
export const clients = { name: 'Clients', link: authPrefix + '/clients' };
export const addClient = { name: 'Add Client', link: authPrefix + '/add-client/' };
export const editClient = { name: 'Edit Client', link: authPrefix + '/edit-client/' };
export const clientDocuments = { name: 'Client Documents', link: authPrefix + '/client-documents/' };
export const progressNote = { name: 'Progress Note', link: authPrefix + '/progress-note/' };
export const treatmentPlan = { name: 'Treatment Plan', link: authPrefix + '/treatment-plan/' };
export const assessment = { name: 'Assessment', link: authPrefix + '/assessment/' };
export const dischargeSummery = { name: 'Discharge Summary', link: authPrefix + '/discharge-summary/' };
export const fileManager = { name: 'File Manager', link: authPrefix + '/file-manager/' };
/* Clinet Route End */

/* Profile Route Start */
export const profile = { name: 'Profile', link: authPrefix + '/profile' };
/* Profile Route End */


/* Login & Register Routes Start */
export const Login = { name: 'Login', link: '/login' };
export const Register = { name: 'Register', link: '/register' };
export const NewPassword = { name: 'New Password', link: '/new-password' };

export const PPPage = { name: 'PrivacyPolicy', link: '/privacy-policy' };
export const BAPage = { name: 'BusinessAgreement', link: '/business-agreement' };
export const TCPage = { name: 'TermConditions', link: '/term-and-conditions' };
export const CSPage = { name: 'ComingSoon', link: '/comingsoon' };

/* Login & Register Routes End */

/* static page S */
export const FAQPage = {name: "FAQ", link: '/faq'}
export const HelpPage = {name: "Help", link: '/help'}
export const TNCPage = {name: "TNC", link: '/tern-and-condition'}
export const AboutPage = {name: "About", link: '/about'}
export const NotesPage = {name: "Notes", link: '/notes'}
export const FeaturesPage = {name: "Features", link: '/features'}
export const PricingPage = {name: "Pricing", link: '/pricing'}
export const SitemapPage = {name: "Sitemap", link: '/sitemap'}
/* static page E */

const RouterPage = () => {
    const redirect = useNavigate();
    const [step, setStep] = useState(0);

    const setCurrentStepFun = (step) => {
        switch (step) {        
            case 0:
                redirect(authPrefix, true);
                break;
            case 1:
                redirect(authPrefix, true);
                break;
            case 2:
                redirect(authPrefix, true);
                break;
            case 3:
                redirect(clinician.link, true);
                break;
            case 4:
                redirect(addClinician.link, true);
                break;
            case 5:
                redirect(clinician.link, true);
                break;
            case 6:
                redirect(clients.link, true);
                break;
            case 7:
                redirect(clients.link, true);
                break;
            case 8:
                redirect(addClient.link+"0", true);
                break;
            case 9:
                redirect(clients.link, true);
                break;
            default:
            break;
        }
        setStep(step);
    };
    return (
        <>
         <TourProvider steps={steps} currentStep={step} setCurrentStep={setCurrentStepFun}>
            <Routes>
                {/* ------------------ auth routes start ------------------ */}                       
                    <Route path={authPrefix}>
                        <Route index={true} element={<AuthRoute><Home /></AuthRoute>} />
                        {/* Clinician */}
                        <Route index={false} path={clinician.link} element={<AuthRoute BreadCrumbList={[clinician]} pageName={clinician.name}><Clinician /></AuthRoute>} />
                        <Route index={false} path={addClinician.link} element={<AuthRoute BreadCrumbList={[clinician, addClinician]} pageName={addClinician.name}><AddClinician /> </AuthRoute>} />
                        <Route index={false} path={editClinician.link + '/:id'} element={<AuthRoute BreadCrumbList={[clinician, editClinician]} pageName={editClinician.name}><AddClinician /> </AuthRoute>} />
                        <Route index={false} path={viewClinician.link + '/:id'} element={<AuthRoute BreadCrumbList={[clinician, viewClinician]} pageName={viewClinician.name} isSidebar={false}><ViewClinician /></AuthRoute>} />
                        <Route index={false} path={viewClinicianClient.link + '/:id'} element={<AuthRoute BreadCrumbList={[clinician, viewClinicianClient]} pageName={viewClinicianClient.name} isSidebar={true}><Client /></AuthRoute>} />

                        {/* Account */}
                        <Route index={false} path={account.link} element={<AuthRoute BreadCrumbList={[account]} pageName={account.name}><Account /></AuthRoute>} />
                        <Route index={false} path={addAccount.link} element={<AuthRoute BreadCrumbList={[account, addAccount]} pageName={addAccount.name}><AddAccount /></AuthRoute>} />
                        <Route index={false} path={editAccount.link+ ':id'} element={<AuthRoute BreadCrumbList={[account, editAccount]} pageName={editAccount.name}><AddAccount /></AuthRoute>} />
                        <Route index={false} path={subscription.link} element={<AuthRoute BreadCrumbList={[subscription]} pageName={subscription.name} isSidebar={false}><Subscription /></AuthRoute>} />
                        <Route index={false} path={viewAccount.link + ':id'} element={<AuthRoute BreadCrumbList={[account, viewAccount]} pageName={viewAccount.name} isSidebar={false}><ViewAccount /></AuthRoute>} />

                        {/* client */}
                        <Route index={false} path={clients.link} element={<AuthRoute BreadCrumbList={[clients]} pageName={clients.name}><Client /></AuthRoute>} />
                        <Route index={false} path={addClient.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, addClient]} pageName={addClient.name}><AddClient /></AuthRoute>} />
                        <Route index={false} path={editClient.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, editClient]} pageName={editClient.name}><AddClient /></AuthRoute>} />
                        <Route index={false} path={progressNote.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, progressNote]} pageName={progressNote.name} isSidebar={false}><ProgressNote /></AuthRoute>} />
                        <Route index={false} path={treatmentPlan.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, treatmentPlan]} pageName={treatmentPlan.name} isSidebar={false}><ProgressNote /></AuthRoute>} />
                        <Route index={false} path={assessment.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, assessment]} pageName={assessment.name} isSidebar={false}><ProgressNote /></AuthRoute>} />
                        <Route index={false} path={dischargeSummery.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, dischargeSummery]} pageName={dischargeSummery.name} isSidebar={false}><ProgressNote /></AuthRoute>} />
                        <Route index={false} path={fileManager.link + ':id'} element={<AuthRoute BreadCrumbList={[clients, fileManager]} pageName={fileManager.name} isSidebar={false}><FileManager /></AuthRoute>} />
                        <Route index={false} path={clientDocuments.link + ':id/:pageId'} element={<AuthRoute BreadCrumbList={[clients, clientDocuments]} pageName={clientDocuments.name} isSidebar={false}><ViewDetail /></AuthRoute>} />
                        {/* profile */}
                        <Route index={false} path={profile.link} element={<AuthRoute BreadCrumbList={[profile]} pageName={profile.name} isSidebar={false}><MyProfile /></AuthRoute>} />                
                    </Route>
                {/* ------------------ auth routes end ------------------ */}     

                    <Route path={"/"}>
                        {/* <Route index={true} element={ <FrontHome /> } /> */}
                        <Route index={true} element={<FrontComingSoon />} />
                        {/* <Route index={false} path={CSPage.link} element={<FrontComingSoon />} /> */}
                        <Route index={false} path={Login.link} element={<LoginComponent /> } />
                        <Route index={false} path={Register.link} element={<RegisterComponent />} />
                        <Route index={false} path={NewPassword.link} element={<NewPasswordComponent />} />

                        <Route index={false} path={PPPage.link} element={<PrivacyPolicyComponent />} />
                        <Route index={false} path={BAPage.link} element={<BusinessAgreementComponent />} />
                        <Route index={false} path={TCPage.link} element={<TermConditions />} />

                        <Route index={false} path={FAQPage.link} element={<FAQ />} />
                        <Route index={false} path={HelpPage.link} element={<Help />} />
                        <Route index={false} path={TNCPage.link} element={<TermAndCondition />} />
                        <Route index={false} path={AboutPage.link} element={<About />} />
                        <Route index={false} path={NotesPage.link} element={<Notes />} />
                        <Route index={false} path={FeaturesPage.link} element={<Features />} />
                        <Route index={false} path={PricingPage.link} element={<Pricing />} />
                        <Route index={false} path={SitemapPage.link} element={<Sitemap />} />
                    </Route>             
                    <Route path={AbortPage.link} element={<PageNotFound />} />
            </Routes>
        </TourProvider>
        </>
    )
}

export default RouterPage