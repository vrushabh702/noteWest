import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuthData } from '../../Session';
import "./headerNavigations.css"
import $ from "jquery";





function HeaderNavigations() {


    const AuthData = getAuthData();
    // commented SearchFunctionality
    // const [Value, setValue] = useState();
    // const debounce = (func, delay) => {
    //     let debounceTimer;
    //     return function () {
    //         const context = this;
    //         const args = arguments;
    //         clearTimeout(debounceTimer);
    //         debounceTimer = 
    //             setTimeout(() => func.apply(context, args), delay);
    //     }
    // }
    // const onChangeHandler = ((e) => {
    //     setValue(e.target.value);
    //     let value=e.target.value;
    //     console.log(value)
    //     var documentContent = $("#progressNote")     
    //     var myVar = $('.searchingTextBG');
    //     if(value!=""){
    //         $('.collapse').addClass('show')
    //     }
    //     //Remove class
    //     for (let l = 0; l < myVar.length; l++) {
    //         const element = myVar[l];
    //         let findElement=$(element)[0]
    //             let s=findElement.innerHTML.replaceAll(/<span class="searchingTextBG">/gi,"")
    //             s.replaceAll(/<\/span>/gi,"")

    //             findElement.innerHTML =s
            
    //     }
    //     let pattern=new RegExp("("+value+")(?![^<>]*>)", "ig")
    //     for (let index = 0; index < $('.accordion-item').length; index++) {
    //         const element = $('.accordion-item')[index];
    //         for (let k = 0; k < $('label',element).length; k++) {
    //             const Parentelement = $('label',element)[k];
    //             const elementText=$(Parentelement).text()
    //             $(Parentelement).html(elementText.replaceAll(pattern,function(str) {return "<span class='searchingTextBG'>"+str+"</span>"}));
                
    //         }
            
    //     }
    //     // filter in Card
    //     if (documentContent.length > 0) {
    //         const tempInnerHtml =  document.getElementsByClassName("fs-6 text-dark form-label mb-0")
    //         var str1 = documentContent[0].children[0].innerHTML
    //         str1=str1.replaceAll(/<span class="searchingTextBG">/gi,"")
    //         str1=str1.replaceAll(/<\/span>/gi,"")
    
    //         var reg = new RegExp(value, 'gi');
    //         var foundIndex = str1.match(reg);
          
    //         if(foundIndex){
                
               
    //             let pattern=new RegExp("("+value+")(?![^<>]*>)", "ig")
    //             // var query = new RegExp("("+searchTxtBox.val()+")", "im");       
    //             documentContent[0].children[0].innerHTML = str1.replaceAll(pattern,function(str) {return "<span class='searchingTextBG'>"+str+"</span>"});
                
    //         }else{
    //             documentContent[0].children[0].innerHTML=str1
    //         }
           
    //     }
    // });
    // const onOptimisedHandleChange = debounce(onChangeHandler,500);
    return (
        <div>
            <div className="d-flex align-items-stretch" id="kt_header_nav">
                <div className="header-menu align-items-stretch">
                    {/*begin::Menu*/}
                    <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
                        {AuthData.dashboard.read ?
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <Link to="/auth/"><span className="menu-title">To Do List</span></Link>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            : ''}
                        {AuthData.clinic.read ?
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <Link to="/auth/clinician"><span className="menu-title">Manage Clinicians</span></Link>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            : ''}
                        {AuthData.account.read ?
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <Link to="/auth/accounts"><span className="menu-title">Manage Account</span></Link>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            : ''}
                        {AuthData.notes.read ?
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <Link to="/auth/clients"><span className="menu-title">Clients/Notes</span></Link>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            : ''}
                        {AuthData.notes.read ?
                            <div className="menu-item menu-lg-down-accordion me-lg-1">
                                <span className="menu-link py-3">
                                    <Link to="/help"><span className="menu-title">Help/How To</span></Link>
                                    <span className="menu-arrow d-lg-none" />
                                </span>
                            </div>
                            : ''}
                        {/* <div className="menu-item menu-lg-down-accordion me-lg-1">
                            <span className="menu-link py-3">
                                <span className="menu-title">Help/How To</span>
                                <span className="menu-arrow d-lg-none" />
                            </span>
                        </div> */}
                        {/*begin::searchBarMenu*/}
                            {/* Remove Header in SearchBar */}
                        {/* {AuthData.notes.read ?
                            <div className="card-title">
                                <div className='d-flex align-items-center position-relative my-1'>
                                    <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="black" />
                                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                        </svg>
                                    </span>
                                    <input type="text" id='searchContent' className='form-control form-control-solid w-250px ps-15' placeholder='Search...' onChange={onOptimisedHandleChange} />
                                </div>
                            </div>
                            : ''} */}
                    </div>
                    {/*end::searchBarMenu*/}
                </div>
            </div>
        </div>
    )
}

export default HeaderNavigations
