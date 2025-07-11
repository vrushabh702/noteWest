import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb(props) {
    const list = props.list;
    const lastIndex = (list).length - 1;
    return (
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">        
        <div id="kt_toolbar_container" className="container-xxl d-flex flex-stack flex-wrap">          
          <div className="page-title d-flex flex-column me-3">            
            <h1 className="d-flex text-white fw-bolder my-1 fs-1">{ props.pageName }</h1>

            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-3 my-1">              
              {                
                (list).map((e, i) => {                  
                return <React.Fragment key={i+e}> { i > 0 ? <li className="breadcrumb-item">
                                      <span className="bullet bg-white opacity-75 w-5px h-2px" />
                                    </li> 
                                  : '' }
                          <li className="breadcrumb-item text-white opacity-75">
                             { i === lastIndex ? <span>{e.name}</span> : <Link to={e.link} className="text-white text-hover-primary"><span>{e.name}</span></Link> }
                          </li>
                      </React.Fragment>
                })
              }                               
            </ul>            
          </div>          
        </div>        
      </div>
    )
}
