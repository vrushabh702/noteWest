import React from 'react'
import Footer from '../../Back/pages/components/Footer'
import Header from '../../Back/pages/components/Header'

function Help() {
  const data = require('./FAQ.json')
  return (
    <>
      <Header />
      <div className="container card p-2 px-4" style={{ marginBottom: "8rem" }}>
        {/* {
        data.map((e, i) => {
          return (<div className='my-2' key={i}>
          <h3>{e.title}</h3>
             {e.description.split('\n').map(str => <p>{str}</p>)}
          </div>)
        })
      } */}
        {/* <div className='my-2'>
        <h3>How to Youtube videos</h3>
        <p></p>
      </div>
      <div className='my-2'>
        <h3>How to sign up</h3>
        <p></p>
      </div> */}
        <div className="how-to-section">
          <h3>How to add/edit clinicians-</h3>
          <div
          className='how-to-videos'
            style={{
              position: "relative",
              // width: "100%",
              height: 0,
              // "padding-top": "56.2500%",
              "padding-bottom": 0,
              "box-shadow": "0 2px 8px 0 rgba(63,69,81,0.16)",
              "margin-top": "1.6em",
              "margin-bottom": "0.9em",
              overflow: "hidden",
              "border-radius": "8px",
              "will-change": "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: " 100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGJWX8JPUg/PcuPJkOPtqA6dUnw4zjZBg/watch?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
        <div className="how-to-section">
          <h3>How to add a client-</h3>
          {/* <p></p> */}
          <div
          className='how-to-videos'
            style={{
              position: "relative",
              // width: "100%",
              height: 0,
              // "padding-top": "56.2500%",
              "padding-bottom": 0,
              "box-shadow": "0 2px 8px 0 rgba(63,69,81,0.16)",
              "margin-top": "1.6em",
              "margin-bottom": "0.9em",
              overflow: "hidden",
              "border-radius": "8px",
              "will-change": "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: " 100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGD66R75oo/kR5HrhtlcR5zxeJNm7_cMA/watch?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
        <div className="how-to-section">
          <h3>How to create a document-</h3>
          {/* <p></p> */}
          <div
          className='how-to-videos'
            style={{
              position: "relative",
              // width: "100%",
              height: 0,
              // "padding-top": "56.2500%",
              "padding-bottom": 0,
              "box-shadow": "0 2px 8px 0 rgba(63,69,81,0.16)",
              "margin-top": "1.6em",
              "margin-bottom": "0.9em",
              overflow: "hidden",
              "border-radius": "8px",
              "will-change": "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: " 100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGJWffLdAw/LMDVdaj6xTJXXkkKacueRQ/watch?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
        <div className="how-to-section">
          <h3>How to view/edit/download notes and use various text options-</h3>
          {/* <p></p> */}
          <div
          className='how-to-videos'
            style={{
              position: "relative",
              // width: "100%",
              height: 0,
              // "padding-top": "56.2500%",
              "padding-bottom": 0,
              "box-shadow": "0 2px 8px 0 rgba(63,69,81,0.16)",
              "margin-top": "1.6em",
              "margin-bottom": "0.9em",
              overflow: "hidden",
              "border-radius": "8px",
              "will-change": "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: " 100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGJWXvAMwI/WAkQJn1poY6ytK0hOwlPXA/watch?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
        {/* <div className="my-2">
          <h3>How to write a note with generator-</h3>
          <p></p>
        </div>
        <div className="my-2">
          <h3>How to make changes to note/hand-write note-</h3>
          <p></p>
        </div>
        <div className="my-2">
          <h3>How to upload/download notes-</h3>
          <p></p>
        </div>
        <div className="my-2">
          <h3>How to update payment method-</h3>
          <p></p>
        </div> */}
        <div className="how-to-section">
          <h3>I have feedback, how can I offer it?</h3>
          <p>We welcome feedback and suggestions and are constantly thinking of ways to improve our
          platform. Please send any feedback via email.</p>
        </div>
        <div className="how-to-section">
          <h3>How to cancel my subscription-</h3>
          <p>Please send your cancel request via email to <a href='mailto:chloe@notenest.com'>chloe@notenest.com</a> and kindly allow 3 business days for your membership to be canceled.</p>
        </div>
        <div className="how-to-section">
          <h3>How to contact us-</h3>
          <p>Please feel free to contact as at any time via email- <a href='mailto:chloe@notenest.com'>chloe@notenest.com</a></p>
          <p>We will get back to you as soon as possible.</p>
          <p>You may also call 804-847-0617 Monday, Wednesday, Friday 9am-5pm</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Help