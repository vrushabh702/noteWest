import React from 'react'
import Footer from '../../Back/pages/components/Footer'
import Header from '../../Back/pages/components/Header'

function TermAndCondition() {
    const data = require('./TNC.json')

    return (
        <>
        <Header />
        <div className='container card p-2 px-4'>
          {
            data.map((e, i) => {
              return (<div className='my-2' key={i}>
              <h3>{e.title}</h3>
                 {e.description.split('\n').map(str => <p>{str}</p>)}
              </div>)
            })
          }         
        </div>
        <Footer />
        </>
    )
}

export default TermAndCondition