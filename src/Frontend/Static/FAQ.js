import React from 'react'
import Footer from '../../Back/pages/components/Footer'
import Header from '../Header'
// import Header from '../../Back/pages/components/Header'

function FAQ() {
  const data = require('./FAQ.json')
  return (
    <>
    <Header />
    <div className='container card p-2 px-4' style={{marginBottom:"8rem"}}>
      {
        data.map((e, i) => {
          return (<div className='my-2' key={i}>
          <h3>{e.title}</h3>
             {e.description.split('\n').map(str => <p>{str}</p>)}
          </div>)
        })
      }
      <div className='my-2'>
        <h3>I am having a problem and need further help.</h3>
        <p>
          Please contact us via email <a href='mailto:chloe@notenest.com'>chloe@notenest.com</a> or give us a call at 804-847-0617 Monday, Wednesday, Friday 9am-5pm Eastern. If we do not
          answer, someone will get back to you ASAP.
          We are a very small start-up company trying to do something pretty new. Please feel free to
          contact us at any time if you have suggestions or feedback.
        </p>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default FAQ