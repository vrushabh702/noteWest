import React, { useEffect } from 'react'
import FrontHeader from '../../../Frontend/FrontHeader'
import FrontFooter from '../../../Frontend/FrontFooter'

function PageNotFound() {
    useEffect(() => {
        // const el = document.getElementsByTagName("body");
        // el.style.css
        document.body.style.background = "none"
        return () => {
            document.body.style.background = "/assets/media/img/header-bg.jpg"
            
        }
    },[])
    return (
        <div class="d-flex flex-column flex-root font-fira-sans pagenotfound">
            <FrontHeader />
        {/* <div>
            <h1>404 - PAGE NOT FOUND</h1>
        </div> */}
        <div className='container text-center'>
            <img src={'assets/img/404.png'} className='img-fluid w-50 ' />
        </div>

        <FrontFooter />
        </div>
    )
}

export default PageNotFound
