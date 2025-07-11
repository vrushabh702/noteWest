import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthData, getUser } from "../Session";
import { useTour } from '@reactour/tour';
import { postRequest, Url } from '../CustomHttp';
import ReactIndex from '../../../HOC/ReactTable/TableIndex';
import { ClientColumns2, pendingNotes, pendingSignatures } from '../client/ClientColumns2';
import Loader from 'react-loader-spinner'
import CustModal from '../../../HOC/CustModal';
import style from './Home.module.css'
import StartupModal from '../../../HOC/StartupModal';
import { UserInformation } from '../other/userProfile/MyProfile';


export default function Home() {
    const userData = getUser();
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.dashboard.read){
        navigate('/auth/profile')
      }
    },[])
    
    const [clientsPendingSignatureList, setClientsPendingSignatureList] = useState();
    const [clientsPendingSignatureListLoader, setClientsPendingSignatureListLoader] = useState(false)
    const [clientsPendingSignatureListMessage, setClientsPendingSignatureListMessage] = useState()
    const [clientsPendingSignaturelimit, setclientsPendingSignatureLimit] = useState(10);
    const [clientsPendingSignaturecurrentPage, setclientsPendingSignatureCurrentPage] = useState(0);
    const [clientsPendingSignaturetableData, setclientsPendingSignatureTableData] = useState(null);

    const [clientsInprogressList, setClientsInprogressList] = useState();
    const [clientsInprogressListLoader, setClientsInprogressListLoader] = useState(false)
    const [clientsInprogressListMessage, setClientsInprogressListMessage] = useState()
    const [clientsInprogresslimit, setclientsInprogressLimit] = useState(10);
    const [clientsInprogresscurrentPage, setclientsInprogressCurrentPage] = useState(0);
    const [clientsInprogresstableData, setclientsInprogressTableData] = useState(null);

    const [clientsListNoTP, setClientsListNoTP] = useState();
    const [clientsListNoTPMessage, setClientsListNoTPMessageMessage] = useState()
    const [clientsListNoTPLoader, setClientsListNoTPLoader] = useState(false)
    const [clientsListNoTPlimit, setClientsListNoTPLimit] = useState(10);
    const [clientsListNoTPcurrentPage, setClientsListNoTPCurrentPage] = useState(0);
    const [clientsListNoTPtableData, setClientsListNoTPTableData] = useState(null);


    const { setIsOpen, setCurrentStep } = useTour()

    useEffect(() => {
        getClientInprogressList();
        getClientListNoTP();
    }, [])

    async function getClientPendingSignatureList() {
      setClientsPendingSignatureListLoader(true)
      const postData = await postRequest('/clients-pending-sign-doc-list', {limit: clientsInprogresslimit, page: clientsInprogresscurrentPage+1}, true);
      if (postData && postData.status) {
          setClientsPendingSignatureList(postData.data)
          setclientsPendingSignatureTableData({
              limit: clientsPendingSignaturelimit,
              currentPage: clientsPendingSignaturecurrentPage,
              totalCount: postData.total_count,
              data: postData.data
          });
          setClientsPendingSignatureListLoader(false)
      } else {
          setClientsPendingSignatureListMessage(postData.message)
          setClientsPendingSignatureList([])
          setclientsPendingSignatureTableData({
              limit: clientsPendingSignaturelimit,
              currentPage: clientsPendingSignaturecurrentPage,
              totalCount: postData.total_count,
              data: []
          });
          setClientsPendingSignatureListLoader(false)
      }
      // setClientsPendingSignatureListLoader(false)
  }

    async function getClientInprogressList() {
        setClientsInprogressListLoader(true)
        const postData = await postRequest('/clients-latest-inprogress-doc-list', {limit: clientsInprogresslimit, page: clientsInprogresscurrentPage+1}, true);
        if (postData && postData.status) {
            setClientsInprogressList(postData.data)
            setclientsInprogressTableData({
                limit: clientsInprogresslimit,
                currentPage: clientsInprogresscurrentPage,
                totalCount: postData.total_count,
                data: postData.data
            });
        } else {
            setClientsInprogressListMessage(postData.message)
            setClientsInprogressList([])
            setclientsInprogressTableData({
                limit: clientsInprogresslimit,
                currentPage: clientsInprogresscurrentPage,
                totalCount: postData.total_count,
                data: []
            });
        }
        setClientsInprogressListLoader(false)
    }

    // pageIndex, pageSize
    const handleClientsInprogressPageChange = (event) => {
        setclientsInprogressCurrentPage(event.pageIndex);
        setclientsInprogressLimit(event.pageSize);
    };

    React.useEffect(() => {
        getClientInprogressList();
    }, [clientsInprogresslimit, clientsInprogresscurrentPage]);

    const handleClientsPendingSignaturePageChange = (event) => {
        setclientsPendingSignatureCurrentPage(event.pageIndex);
        setclientsPendingSignatureLimit(event.pageSize);
    };

    React.useEffect(() => {
        getClientPendingSignatureList();
    }, [clientsPendingSignaturelimit, clientsPendingSignaturecurrentPage]);


    async function getClientListNoTP() {
        setClientsListNoTPLoader(true)
        const postData = await postRequest('/clients-list-noTP', {limit: clientsListNoTPlimit, page: clientsListNoTPcurrentPage+1}, true);
        if (postData && postData.status) {
            setClientsListNoTP(postData.data)
            setClientsListNoTPTableData({
                limit: clientsListNoTPlimit,
                currentPage: clientsListNoTPcurrentPage,
                totalCount: postData.total_count,
                data: postData.data
            });
        } else {
            setClientsListNoTP([])
            setClientsListNoTPMessageMessage(postData.message)
            setClientsListNoTPTableData({
                limit: clientsListNoTPlimit,
                currentPage: clientsListNoTPcurrentPage,
                totalCount: postData.total_count,
                data: []
            });
        }
        setClientsListNoTPLoader(false)
    }
    // pageIndex, pageSize
    const handleClientsListNoTPPageChange = (event) => {
        setClientsListNoTPCurrentPage(event.pageIndex);
        setClientsListNoTPLimit(event.pageSize);
    };

    React.useEffect(() => {
        getClientListNoTP();
    }, [clientsListNoTPlimit, clientsListNoTPcurrentPage]);
    const [modalState1, setModalState1] = useState({
      modal: false,
      minimize: false,
    });
    const [modalState2, setModalState2] = useState({
      modal: false,
      minimize: false,
    });
    const [memberCount,setMemberCount] = useState(0);
    // const {id} = useContext(UserInformation);  
    useEffect(() => {
       const getUserData = async () => {
          const Url = '/profile';
          const postData = {};
          const getData = await postRequest(Url, postData,true);                          
          if(getData){
            if(getData.status){
              console.log('getData',getData.data.membership.person);
              setMemberCount(getData.data.membership.person)
              if(getData.data.membership.person == 1){
                // setModalState1({
                //   modal: true,
                //   minimize: false,
                // });
              } else {
                // setModalState2({
                //   modal: true,
                //   minimize: false,
                // });
              }
            }
           }
      }   
      getUserData();
    }, []);

    return (
      <React.Fragment>
        {(modalState1.minimize || modalState2.minimize) ? (
          <button
            className="btn btn-primary active"
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
            }}
            onClick={() => {
              if(memberCount == 1){
                setModalState1({
                  modal: true,
                  minimize: false,
                });
              } else {
                setModalState2({
                  modal: true,
                  minimize: false,
                });
              }
            }}
          >
            Help/How To
          </button>
        ): ""}
        {/* For Single User  */}
        <StartupModal
          show={modalState1.modal}
          close={() => {
            setModalState1({
              modal: false,
              minimize: false,
            });
          }}
          onMinimize={() => {
            setModalState1({
              modal: false,
              minimize: true,
            });
          }}
        >
          <p>
            <b>
              🎉Welcome to NoteNest and congratulations on taking the first step
              in transforming the way you keep notes!
            </b>{" "}
            🎉Here are a few steps to help you get acquainted:{" "}
          </p>
          <p>📖Tutorial: Please don’t skip this!</p>
          <ol className={style.ol}>
            <li>
              <b>👤Add a Fake Client:</b> Add a pretend client’s basic
              information to learn how to navigate NoteNest. (Add a client by
              clicking the button “Add Client” on the top right of the
              clients/notes page)
              <br />
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/y3J2Eu4Kj1k" target='_blank'>
                      https://youtu.be/y3J2Eu4Kj1k
                    </a>
                  </i>
                </small>
              </p>
            </li>
            <li>
              <b>👨‍⚕️Profile and Diagnosis:</b> Go to your new client’s profile by
              clicking on their name. Now you will see your client’s profile
              with the 4 colored buttons on top to create your four document
              types. Below that you can see the client diagnosis box which says
              “start typing.” Click on this box and type “Unspecified Anxiety”
              and make the selection. You can change and update diagnoses at any
              time.
            </li>
            <li>
              <p>
                <b>📝 Create Documents:</b> NoteNest works best when you start
                with an assessment and treatment plan, and we strongly encourage
                you to try them now, as their content is integrated into the
                progress note. We understand that with your existing caseload
                you may want to skip right to making progress notes and that’s
                just fine! Start by clicking the colored box of your choice at
                the top of the client’s profile.
              </p>
              <p>
                Once your document screen opens, change the date OR press the
                blue start button next to the date. Then click on blue bars to
                open sections and select checkboxes within those sections (blue
                bars can be opened and closed without losing content). Then
                watch as your document writes itself on the right side of the
                screen.
              </p>
              <p>
                {" "}
                *Tip 1- Try adding keywords by typing them in the “add new”
                boxes and clicking the blue plus button and also try typing in
                the “notes” boxes to customize your text.
              </p>
              <p>
                *Tip 2- In the assessment and progress notes you will find the
                MSE- try sliding the “all normal” button at the top of this
                section and then changing checkbox selections.
              </p>
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/0TUXlDn0KPU" target='_blank'>
                      https://youtu.be/0TUXlDn0KPU
                    </a>
                  </i>
                </small>
              </p>
            </li>
            <li>
              <b>📄Replicate a Note:</b> Make one more progress note and check
              out the “replicate note” feature. This is one of the most helpful
              features as you can replicate keywords and then make changes to
              those.
            </li>
            <li>
              <b>✍️Explore Text Options:</b> In progress notes, select manual
              edit and try different text options (default, option 1, option 2)
              to see how your note changes. You can make direct changes to the
              document here as well by typing. (This is a great feature when
              replicating notes!)
              <br />
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/0TUXlDn0KPU" target='_blank'>
                      https://youtu.be/0TUXlDn0KPU
                    </a>
                  </i>
                </small>
              </p>
            </li>
            <li>
              <b>🖋️Sign Off:</b> Once done, sign off on your documents. You are
              all set!
            </li>
          </ol>
          <p>
            *Note if you would like to delete this client, please start by
            deleting the note, then go to the client’s profile. Select the edit
            “pencil” button next to their name at the top of the page. You can
            scroll down and delete them.
          </p>
          <p>
            <b>Additional Features:</b>
          </p>
          <ul className={style.ul}>
            <li>
              Check out the help/how-to tab for helpful videos. We walk through
              all of the steps above.
            </li>
            <li>
              Update your profile information, including your signature, by
              toggling over your initials at the top right.
            </li>
          </ul>
          <p>
            <b>Learning Curve:</b>
          </p>
          <ul className={style.ul}>
            <li>Expect a bit of a learning curve with NoteNest.</li>
            <li>
              It typically takes about 10 documents to get the hang of it.
            </li>
            <li>
              After 20 documents, providers can produce notes in under 3
              minutes.
            </li>
            <li>
              Eventually, you’ll be able to create a complete progress note in
              under a minute!
            </li>
          </ul>
          <p><b>You got this!</b></p>
          <ul className={style.ul}>
          <li>We know you’re busy, but sticking with it will make the process easier and faster.</li>
          </ul>
          <p>We hope you find NoteNest helpful. Just remember, we do not use AI and maintain the highest HIPAA compliance. Happy noting! 📋🖋️</p>
        </StartupModal>
        {/* For Group */}
        <StartupModal
          show={modalState2.modal}
          close={() => {
            setModalState2({
              modal: false,
              minimize: false,
            });
          }}
          onMinimize={() => {
            setModalState2({
              modal: false,
              minimize: true,
            });
          }}
        >
          <p>
            🎉{" "}
            <b>
              {" "}
              Welcome to NoteNest and congratulations on taking the first step
              in transforming the way you keep notes!
            </b>{" "}
            🎉Here are a few steps to help you get acquainted:{" "}
          </p>
          <p>📖Tutorial: Please don’t skip this!</p>
          <p>
            Firstly: To get a feel for the flow of creating document, start by
            making a fake client and note
          </p>
          <ol className={style.ol}>
            <li>
              <b>👤Add a Fake Client: </b>Add a pretend client’s basic
              information to learn how to navigate NoteNest. (Add a client by
              clicking the button “Add Client” on the top right of the
              clients/notes page)
              <br />
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/y3J2Eu4Kj1k" target='_blank'>
                      https://youtu.be/y3J2Eu4Kj1k
                    </a>
                  </i>
                </small>{" "}
              </p>
            </li>
            <li>
              <b>👨‍⚕️Profile and Diagnosis:</b> Go to your new client’s profile by
              clicking on their name. Now you will see your client’s profile
              with the 4 colored buttons on top to create your four document
              types. Below that you can see the client diagnosis box which says
              “start typing.” Click on this box and type “Unspecified Anxiety”
              and make the selection. You can change and update diagnoses at any
              time.
            </li>
            <li>
              <b>📝 Create Documents:</b> NoteNest works best when you start
              with an assessment and treatment plan, and we strongly encourage
              you to try them now, as their content is integrated into the
              progress note. We understand that with your existing caseload you
              may want to skip right to making progress notes and that’s just
              fine! Start by clicking the colored box of your choice at the top
              of the client’s profile.
              <br />
              <br />
              Once your document screen opens, change the date OR press the blue
              start button next to the date. Then click on blue bars to open
              sections and select checkboxes within those sections (blue bars
              can be opened and closed without losing content). Then watch as
              your document writes itself on the right side of the screen.
              <br />
              <br />
              *Tip 1- Try adding keywords by typing them in the “add new” boxes
              and clicking the blue plus button and also try typing in the
              “notes” boxes to customize your text.
              <br />
              <br />
              *Tip 2- In the assessment and progress notes you will find the
              MSE- try sliding the “all normal” button at the top of this
              section and then changing checkbox selections.
              <br />
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/0TUXlDn0KPU" target='_blank'>
                      https://youtu.be/0TUXlDn0KPU
                    </a>
                  </i>
                </small>{" "}
              </p>
            </li>
            <li>
              <b>📄Replicate a Note:</b> Make one more progress note and check
              out the “replicate note” feature. This is one of the most helpful
              features as you can replicate keywords and then make changes to
              those.
            </li>
            <li>
              <b>✍️Explore Text Options:</b> In progress notes, select manual
              edit and try different text options (default, option 1, option 2)
              to see how your note changes. You can make direct changes to the
              document here as well by typing. (This is a great feature when
              replicating notes!)
              <br />
              <p className="text-center">
                <small>
                  <i>
                    *Need more help{" "}
                    <a href="https://youtu.be/7mT1T67Qwoc" target='_blank'>
                      https://youtu.be/7mT1T67Qwoc
                    </a>
                  </i>
                </small>{" "}
              </p>
            </li>
            <li>
              <b>🖋️Sign Off:</b> Once done, sign off on your documents. You are
              all set!
            </li>
          </ol>
          <p>
            *Note if you would like to delete this client, please start by
            deleting the note, then go to the client’s profile. Select the edit
            “pencil” button next to their name at the top of the page. You can
            scroll down and delete them.
          </p>
          <p>
            <b>Secondly:</b> Now it’s time to add and manage clinicians!
          </p>
          <ol className={style.ol}>
            <li>
              <b>✔️ Check your subscription:</b> Begin by clicking your initials
              on the top right of the screen and selecting “my profile.” On the
              right side of the screen under “membership” you can see how many
              users you are subscribed for and make changes to add or remove
              users.
            </li>
            <li>
              <b>➕ Add a clinician:</b> Select the Manage Clinicians tab on the
              top of the page. You will see your profile. On the top right of
              the page, select the “Add Clinician” button. Add the appropriate
              information and click “submit” at the bottom of the page
            </li>
            <li>
              <b>🧑Give your clinician a client:</b> Now you will see your
              clinician and yourself on the dashboard. Click the “view clients”
              icon in front of your clinician’s name. Here you can add/assign
              clients for your providers by clicking “add client” and see all of
              their client’s and notes. You will also see these clients in your
              general “clients/notes” tab, as will all the practice
              administrators.{" "}
            </li>
          </ol>
          <p className="text-center">
            *Need more help? Please check out the youtube link-{" "}
            <a href="https://www.youtube.com/watch?v=70em4MGafMg" target='_blank'>
              Adding/Managing Clinicians
            </a>
          </p>
          <p>
            <b>Additional Features:</b>
          </p>
          <ul className={style.ul}>
            <li>
              Check out the help/how-to tab for helpful videos. We walk through
              all of the steps above.
            </li>
            <li>
              Update your profile information, including your signature, by
              toggling over your initials at the top right.
            </li>
          </ul>
          <p>
            <b>Learning Curve:</b>
          </p>
          <ul className={style.ul}>
            <li>Expect a bit of a learning curve with NoteNest.</li>
            <li>
              It typically takes about 10 documents to get the hang of it.
            </li>
            <li>
              After 20 documents, providers can produce notes in under 3
              minutes.
            </li>
            <li>
              Eventually, you’ll be able to create a complete progress note in
              under a minute!
            </li>
          </ul>
          <p>
            <b>You got this!</b>
          </p>
          <ul className={style.ul}>
            <li>
              We know you’re busy, but sticking with it will make the process
              easier and faster.
            </li>
          </ul>
          <p>
            We hope you find NoteNest helpful. Just remember, we do not use AI
            and maintain the highest HIPAA compliance. Happy noting! 📋🖋️
          </p>
        </StartupModal>
        <div className="content flex-row-fluid dashboard" id="kt_content">
          {/*begin::Row*/}
          <div className="row gy-5 g-xl-8">
            {/*begin::Col*/}
            <div className="col-xxl-12">
              {/*begin::Mixed Widget 2*/}
              <div className="card card-xxl-stretch">
                {/*begin::Header*/}
                <div
                  className="card-header customHeader tour__step-one border-0 py-5"
                  style={{ backgroundColor: "lightseagreen" }}
                >
                  <h3 className="card-title fs-2x py-15 fw-bolder text-white">
                    Welcome {userData.first_name},
                  </h3>
                </div>
                {/*end::Header*/}
                {/*begin::Body*/}
                <div className="card-body p-0">
                  {/*begin::Chart*/}
                  <div
                    className="mixed-widget-2-chart card-rounded-bottom bg-danger"
                    data-kt-color="danger"
                  />
                  {/*end::Chart*/}
                  {/*begin::Stats*/}
                  <div className="card-p mt-n20 position-relative">
                    {/*begin::Row*/}
                    <div className="row g-0">
                      {/*begin::Col*/}
                      <div className="col-12 bg-light-danger px-6 py-8 rounded-2 mb-7">
                        {/*begin::Svg Icon | path: icons/duotune/finance/fin006.svg*/}
                        {/* <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                                                    <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                                                </svg>
                                            </span> */}
                        {/*end::Svg Icon*/}
                        <div>
                          <h5 style={{ color: "#808080" }}>
                            Pending Signatures
                          </h5>
                        </div>
                        {clientsPendingSignatureList &&
                        clientsPendingSignaturetableData &&
                        !clientsPendingSignatureListLoader ? (
                          <ReactIndex
                            columnData={pendingSignatures}
                            HideHeader={true}
                            TableData={clientsPendingSignaturetableData}
                            handlePageChange={(e) =>
                              handleClientsPendingSignaturePageChange(e)
                            }
                          />
                        ) : (
                          <center>
                            <div className="w-100 mt-2 text-center">
                              {clientsPendingSignatureListMessage}
                            </div>
                          </center>
                        )}
                        {clientsPendingSignatureListLoader ? (
                          <center>
                            <Loader
                              type="ThreeDots"
                              color="#017EAD"
                              height={100}
                              width={100}
                              timeout={300000}
                            />
                          </center>
                        ) : null}
                        {/* <Link to="/auth/" className="text-primary fw-bold fs-6">Reminders</Link> */}
                      </div>
                      {/*end::Col*/}
                    </div>
                    {/*end::Row*/}
                    {/*begin::Row*/}
                    <div className="row g-0">
                      {/*begin::Col*/}
                      <div className="col-12 bg-light-primary px-6 py-8 rounded-2 mb-7">
                        {/*begin::Svg Icon | path: icons/duotune/finance/fin006.svg*/}
                        {/* <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                                                    <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                                                </svg>
                                            </span> */}
                        {/*end::Svg Icon*/}
                        <div>
                          <h5 style={{ color: "#808080" }}>Pending Notes</h5>
                        </div>
                        {clientsInprogressList &&
                        clientsInprogresstableData &&
                        !clientsInprogressListLoader ? (
                          <ReactIndex
                            columnData={pendingNotes}
                            HideHeader={true}
                            TableData={clientsInprogresstableData}
                            handlePageChange={(e) =>
                              handleClientsInprogressPageChange(e)
                            }
                          />
                        ) : (
                          <center>
                            <div className="w-100 mt-2 text-center">
                              {clientsInprogressListMessage}
                            </div>
                          </center>
                        )}
                        {clientsInprogressListLoader ? (
                          <center>
                            <Loader
                              type="ThreeDots"
                              color="#017EAD"
                              height={100}
                              width={100}
                              timeout={300000}
                            />
                          </center>
                        ) : null}
                        {/* <Link to="/auth/" className="text-primary fw-bold fs-6">Reminders</Link> */}
                      </div>
                      {/*end::Col*/}
                    </div>
                    {/*end::Row*/}
                    {/*begin::Row*/}
                    <div className="row g-0">
                      {/*begin::Col*/}
                      <div className="col-12 bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
                        {/*begin::Svg Icon | path: icons/duotune/general/gen032.svg*/}
                        {/* <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <rect x={8} y={9} width={3} height={10} rx="1.5" fill="black" />
                                                    <rect opacity="0.5" x={13} y={5} width={3} height={14} rx="1.5" fill="black" />
                                                    <rect x={18} y={11} width={3} height={8} rx="1.5" fill="black" />
                                                    <rect x={3} y={13} width={3} height={6} rx="1.5" fill="black" />
                                                </svg>
                                            </span>
                                            <div>TEST</div> */}
                        {/*end::Svg Icon*/}

                        <div>
                          <h5 style={{ color: "#808080" }}>
                            Needs Treatment Plan
                          </h5>
                        </div>
                        {clientsListNoTP &&
                        clientsListNoTPtableData &&
                        !clientsListNoTPLoader ? (
                          <ReactIndex
                            columnData={ClientColumns2}
                            HideHeader={true}
                            TableData={clientsListNoTPtableData}
                            handlePageChange={(e) =>
                              handleClientsListNoTPPageChange(e)
                            }
                          />
                        ) : (
                          <center>
                            <div className="w-100 mt-2 text-center">
                              {clientsListNoTPMessage}
                            </div>
                          </center>
                        )}
                        {clientsListNoTPLoader ? (
                          <center>
                            <Loader
                              type="ThreeDots"
                              color="#017EAD"
                              height={100}
                              width={100}
                              timeout={300000}
                            />
                          </center>
                        ) : null}
                        {/* <Link to="/auth/" className="text-warning fw-bold fs-6">Tasks</Link> */}
                      </div>
                      {/*end::Col*/}
                    </div>
                    {/*end::Row*/}
                    {/*begin::Row*/}
                    {/* <div className="row g-0"> */}
                    {/*begin::Col*/}
                    {/* <div className="col bg-light-danger px-6 py-8 rounded-2 me-7"> */}
                    {/*begin::Svg Icon | path: icons/duotune/abstract/abs027.svg*/}
                    {/* <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                    <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                </svg>
                                            </span> */}
                    {/*end::Svg Icon*/}
                    {/* <Link to="/auth/" className="text-danger fw-bold fs-6 mt-2">Alerts</Link> */}
                    {/* </div> */}
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    {/* <div className="col bg-light-success px-6 py-8 rounded-2"> */}
                    {/*begin::Svg Icon | path: icons/duotune/communication/com010.svg*/}
                    {/* <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z" fill="black" />
                                                    <path opacity="0.3" d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z" fill="black" />
                                                </svg>
                                            </span> */}
                    {/*end::Svg Icon*/}
                    {/* <Link to="/auth/" className="text-success fw-bold fs-6 mt-2">Add More</Link> */}
                    {/* </div> */}
                    {/*end::Col*/}
                    {/* </div> */}
                    {/*end::Row*/}
                  </div>
                  {/*end::Stats*/}
                </div>
                {/*end::Body*/}
              </div>
              {/*end::Mixed Widget 2*/}
            </div>
            {/*end::Col*/}
          </div>
          {/*end::Row*/}
        </div>
        <div className="floatingActionButton">
          <button
            onClick={() => {
              setIsOpen(true);
              setCurrentStep(0);
            }}
          >
            Tour
          </button>
        </div>
      </React.Fragment>
    );
}
