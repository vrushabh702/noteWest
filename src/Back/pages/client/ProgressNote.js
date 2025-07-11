import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState, useContext, useEffect, useRef } from "react";
import CustModal from "../../../HOC/CustModal";
import Pare from "../../../HOC/ProgressNote/Pare";
import { postRequest, Url } from "../CustomHttp";
import { userData } from "./ViewDetail";
import Loader from "react-loader-spinner";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import newJosnData from "./newData.json";
import replaceWords1 from "./replaceWords1.json";
import replaceWords2 from "./replaceWords2.json";
import {
  progressAssessment,
  recomendation,
} from "./AdditionalJson/ProgressAssessment";
import $ from "jquery";
export default function ProgressNote(props) {
  let checkSigned = 0;
  let supervisorSigned = 0;
  let showSigned = 0;

  const { userInfo, changePage, editId } = useContext(userData);
  const [ProgressNoteJson, setProgressNoteJson] = useState(newJosnData);
  const [Statement, setStatement] = useState("");
  const [defaultStatement, setDefaultStatement] = useState("");
  const [Durations, setDurations] = useState("");
  const [statusCollapse, setStatusCollapse] = useState(null);
  const [DateOfServices, setDateOfServices] = useState("");
  const [viewEdit, setViewEdit] = useState({
    confirmChange: false,
    wordsReplaced: false,
    diagnosis: userInfo.client_diagnosis ?? [],
    changeId: false,
    showModal: false,
    client_document_id: 0,
    confirmSave: false,
    editData: false,
    viewStatement: false,
    editBy: "",
    editTime: "",
    signed: 1,
    supervisorSigned: 1,
    is_updated: 0,
    viewStatement:""
  });
  const [Data, setData] = useState("");
  const [SignOff, setSignOff] = useState({
    signOff: false,
    signOffConfirm: false,
    signed: 1,
    supervisor_signed: 1,
  });
  const [commonData, setCommonData] = useState({
    date_of_service: new Date(),
    showError: false,
    count: 0,
    replicateNoteData: [],
    sessionDurationCheck: "60",
  });
  const [selectedSearchIndex, setSelectedSeachIndex] = useState(0);
  const [totalSearch, setTotalSearch] = useState(0);
  const URL = "/sentence-builder";
  const [payloadData, setPayloadData] = useState();
  const [editDataofServies, setEditDateofServies] = useState("");

  const [selectAllData, setSelectAllData] = useState({})

  const [sentenceLoader, setSentenceLoader] = useState(false)
  const [checkboxLoader, setCheckboxLoader] = useState(false)
  const handleChildToParent = (date) => {
    setEditDateofServies(date);
    // console.log(
    //   "edit date of cervice ---------------->",
    //   date,
    //   editDataofServies
    // );
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const onSelectedSearchIndex = (flag) => {
    var documentContent = $("#progressNote");
    if (documentContent.length >= 0) {
      var myVar = $(".searchingTextBG");
      setTotalSearch(myVar.length);
      if (myVar.length > 0) {
        // setStatusCollapse(!statusCollapse)
        $(".collapse").addClass("show");
      }
      // console.log("myVar[selectedSearchIndex]",myVar[selectedSearchIndex]);
      $(".selectedSearchIndex").removeClass("selectedSearchIndex");
      let indexFlag = 0;
      // console.log(flag);
      if (flag == "up") {
        if (selectedSearchIndex == 0) {
          setSelectedSeachIndex(myVar.length - 1);
          indexFlag = myVar.length - 1;
        } else {
          setSelectedSeachIndex(selectedSearchIndex - 1);
          indexFlag = selectedSearchIndex - 1;
        }
      } else {
        if (selectedSearchIndex == myVar.length - 1) {
          setSelectedSeachIndex(0);
          indexFlag = 0;
        } else {
          setSelectedSeachIndex(selectedSearchIndex + 1);
          indexFlag = selectedSearchIndex + 1;
        }
      }

      $(myVar[indexFlag]).addClass("selectedSearchIndex");
      myVar[indexFlag].scrollIntoView({ block: "center" });
      // setSelectedSeachIndex(indexFlag)

      // console.log("selectedSearchIndex", selectedSearchIndex, indexFlag);
    }
  };

  function keepSentenceBetweenSpecificWords(sentence, startWord, endWord) {
    // Find the index of the start word
    const startIndex = sentence.indexOf(startWord);
    if (startIndex === -1) {
        // return "Start word not found in the sentence.";
    }

    // Find the index of the end word
    const endIndex = sentence.indexOf(endWord);
    if (endIndex === -1) {
        // return "End word not found in the sentence.";
    }

    // Extract the sentence between the start and end words
    const beforeSentence = sentence.substring(0, startIndex).trim();
    let betweenSentence;
    if(endIndex === -1) {
      betweenSentence = sentence.substring(startIndex + startWord.length).trim();
    } else {
      betweenSentence = sentence.substring(startIndex + startWord.length, endIndex).trim();
    }
    const afterSentence = sentence.substring(endIndex + endWord.length).trim();
    // const betweenSentence = sentence.substring(startIndex + startWord.length, middleIndex).trim();

    return {
      beforeSentence: startIndex === -1 ? "" : beforeSentence,
      betweenSentence: startIndex === -1 ? "" : betweenSentence,
      afterSentence: endIndex === -1 ? "" : afterSentence
  };
}

  function replaceWords(sentence, replacements) {
    // Split the sentence into words
    // const words = sentence.split(/\s+/);
  
    // Iterate through each word
    // const replacedSentence = words.map(word => {
      // Check if the word exists in the replacements object
    //   if (replacements.hasOwnProperty(word)) {
    //     // If it does, replace it with the corresponding value
    //     return replacements[word];
    //   } else {
    //     // If not, keep the original word
    //     return word;
    //   }
    // });
    // const sa = sentence
    const newSs = keepSentenceBetweenSpecificWords(sentence, "MSE", "Goal 1:")
    let newSentence = newSs.betweenSentence === "" ? sentence : newSs.betweenSentence;
    // console.log("newSentence",newSentence)
    for (const [word, replacement] of Object.entries(replacements)) {
      // const regex = new RegExp('\\b' + word + '\\b', 'gi');
      // sentence = sentence.replace(regex, replacement);
      newSentence = newSentence.replace(word, replacement);
    }
    // return sentence;
  
    setStatement(newSs.betweenSentence === "" ? newSentence :(newSs.beforeSentence+ " MSE " +newSentence+ (newSs.afterSentence !== "" ? "Goal 1:" : "")+ newSs.afterSentence))
    setViewEdit(prev => {
      return {
        ...prev,
        wordsReplaced:true,
      }
    })
    // console.log("replaceWords called")
    // Join the words back into a sentence
    // return replacedSentence.join(' ');
  }
  

  const onChangeHandler = (e) => {
    // console.log("call");
    // if (!e.target.value) {
    //   // $(".collapse").removeClass("show");
    //   $(".collapsible").removeClass("show");
    //   // setStatusCollapse(!statusCollapse)
    // }
    if (e.target.value == "" || !e.target.value) {
      setSearchLoader(true)
    setTimeout(() => {
      setSearchLoader(false)
    }, 2000);
    setStatusCollapse(false)
    setTimeout(() => {
      setStatusCollapse(null)
    }, 2000);
      // console.log("e.target.value", typeof e.target.value);
      setSelectedSeachIndex(0);
      setTotalSearch(0);
      // $(".collapse").removeClass("show");
      $(".collapsible").removeClass("show");
      const parentCollapse = $('.parentCollapsibleCheckbox input')
      for(let i = 0; i < parentCollapse.length; i++){
        if($(`#${parentCollapse[i].id}`).is(':checked')){
          const name = $(`#${parentCollapse[i].id}`).attr('id')
          $(`#${name}Collapse`).addClass("show")
        }
      }
      let value = e.target.value;
      // console.log(value);
      var documentContent = $("#progressNote");
      // setStatusCollapse(!statusCollapse)
      var myVar = $(".searchingTextBG");
      //Remove class
      for (let l = 0; l < myVar.length; l++) {
        const element = myVar[l];
        let findElement = $(element)[0];
        let s = findElement.innerHTML.replaceAll(
          /<span class="searchingTextBG">/gi,
          ""
        );
        s.replaceAll(/<\/span>/gi, "");
        // findElement.innerHTML = s;
      }
      let pattern = new RegExp("(" + value + ")(?![^<>]*>)", "ig");
      for (let index = 0; index < $(".collapsible").length; index++) {
        const element = $(".collapsible")[index];
        for (let k = 0; k < $("label", element).length; k++) {
          const Parentelement = $("label", element)[k];
          const elementText = $(Parentelement).text();
          $(Parentelement).html(
            elementText.replaceAll(pattern, function (str) {
              return str;
            })
          );
        }
      }
    } else {
      let value = e.target.value;
      // console.log(value);
      var documentContent = $("#progressNote");
      // setStatusCollapse(!statusCollapse)
      var myVar = $(".searchingTextBG");
      if (value != "") {
        $(".collapse").addClass("show");
      }
      //Remove class
      for (let l = 0; l < myVar.length; l++) {
        const element = myVar[l];
        let findElement = $(element)[0];
        let s = findElement.innerHTML.replaceAll(
          /<span class="searchingTextBG">/gi,
          ""
        );
        s.replaceAll(/<\/span>/gi, "");
        findElement.innerHTML = s;
      }
      let pattern = new RegExp("(" + value + ")(?![^<>]*>)", "ig");
      for (let index = 0; index < $(".collapsible").length; index++) {
        const element = $(".collapsible")[index];
        for (let k = 0; k < $("label", element).length; k++) {
          const Parentelement = $("label", element)[k];
          const elementText = $(Parentelement).text();
          $(Parentelement).html(
            elementText.replaceAll(pattern, function (str) {
              return "<span class='searchingTextBG'>" + str + "</span>";
            })
          );
        }
      }
    }
    // // filter in Card
    // if (documentContent.length > 0) {
    //     const tempInnerHtml = document.getElementsByClassName("fs-6 text-dark form-label mb-0")
    //     var str1 = documentContent[0].children[0].innerHTML
    //     str1 = str1.replaceAll(/<span class="searchingTextBG">/gi, "")
    //     str1 = str1.replaceAll(/<\/span>/gi, "")
    //     var reg = new RegExp(value, 'gi');
    //     var foundIndex = str1.match(reg);
    //     if (foundIndex) {
    //         let pattern = new RegExp("(" + value + ")(?![^<>]*>)", "ig")
    //         // var query = new RegExp("("+searchTxtBox.val()+")", "im");
    //         documentContent[0].children[0].innerHTML = str1.replaceAll(pattern, function (str) { return "<span class='searchingTextBG'>" + str + "</span>" });
    //     } else {
    //         documentContent[0].children[0].innerHTML = str1
    //     }
    // }
    if (e.target.value != "") {
      onSelectedSearchIndex("down");
    }
  };
  const onOptimisedHandleChange = debounce(onChangeHandler, 350);
  const searchRef = useRef(null)
  const [searchLoader, setSearchLoader] = useState(false)
  const clearSearch = () => {
    setSearchLoader(true)
    setTimeout(() => {
      setSearchLoader(false)
    }, 2000);
    setStatusCollapse(false)
    setTimeout(() => {
      setStatusCollapse(null)
    }, 2000);
    const searchValue = searchRef.current.value;
    searchRef.current.value = '';
      setSelectedSeachIndex(0);
      setTotalSearch(0);
      var documentContent = $("#progressNote");
      var myVar = $(".searchingTextBG");
      //Remove class
      for (let l = 0; l < myVar.length; l++) {
        const element = myVar[l];
        let findElement = $(element)[0];
        let s = findElement.innerHTML.replaceAll(
          /<span class="searchingTextBG">/gi,
          ""
        );
        s.replaceAll(/<\/span>/gi, "");
        // findElement.innerHTML = s;
      }
      let pattern = new RegExp("(" + searchValue + ")(?![^<>]*>)", "ig");
      for (let index = 0; index < $(".collapsible").length; index++) {
        const element = $(".collapsible")[index];
        for (let k = 0; k < $("label", element).length; k++) {
          const Parentelement = $("label", element)[k];
          const elementText = $(Parentelement).text();
          $(Parentelement).html(
            elementText.replaceAll(pattern, function (str) {
              return str;
            })
          );
        }
      }
      $(".collapsible").removeClass("show");
      const parentCollapse = $('.parentCollapsibleCheckbox input')
      for(let i = 0; i < parentCollapse.length; i++){
        if($(`#${parentCollapse[i].id}`).is(':checked')){
          const name = $(`#${parentCollapse[i].id}`).attr('id')
          $(`#${name}Collapse`).addClass("show")
        }
      }
  } 
  

  const saveStatement = async () => {
    const postData = await postRequest(
      "/store-client-document",
      {
        Statement,
        data: {
          ...Data,
          client_document_id: viewEdit.client_document_id,
          view_edit_flag: 1,
        },
        document_type: "progress_note",
        client_id: userInfo.id,
        client_document_id: viewEdit.client_document_id,
      },
      true
    );
    if (postData) {
      setViewEdit(prev => {
        return {
          ...prev,
          client_document_id: postData.client_document_id,
          confirmSave: true,
        }
      });
    }
  };

  const signOffFun = async () => {
    const postData = await postRequest(
      "/client-document-update-status",
      {
        client_document_id: viewEdit.client_document_id,
        document_type: "progress_note",
        client_id: userInfo.id,
        signed: SignOff.signed,
        supervisor_signed: SignOff.supervisor_signed,
      },
      true
    );
    if (postData) {
      changePage({ id: 6 });
    }
  };

  const setEditableCheckBox = async () => {
    setLoading(true)
    const postData = await postRequest(
      "/client-document-info",
      { client_document_id: editId },
      true
    );
    // console.log("/client-document-info", postData);
    if (postData) {
      for (const key in JSON.parse(postData.data.front_json)) {
        // console.log(JSON.parse(postData.data.front_json)[key])
        if(JSON.parse(postData.data.front_json)[key]){
          $(`#${key}`).prop("checked",JSON.parse(postData.data.front_json)[key])
          if(key.includes("_goal_")){
            $(`.${key}collapse`).addClass("show")
          }
        }
      }
      setStatement(postData.data.paragraph);
      // setDefaultStatement(postData.data.paragraph);
      setViewEdit(prev => {
        return {
          ...prev,
          confirmChange: postData.data.view_edit_flag ? true : false,
          client_document_id: editId,
          editData: JSON.parse(postData.data.front_json),
          diagnosis: postData.data.client_document_diagnosis ?? [],
          editBy: postData.data.statusUpdatedUserName,
          editTime: postData.data.statusUpdatedDateTime,
          signed: postData.data.signed,
          supervisorSigned: postData.data.supervisor_signed,
          statusSuperVisorSigned: postData.data.statusUpdatedSupervisorUserName,
          signature: postData.data.signature,
        }
      });
      // console.log("viewEdit Edit data",JSON.parse(postData.data.front_json));
      setSelectAllData(JSON.parse(postData.data.front_json))
      getDocData(postData.data);
      setCommonData( prev => {return {
        ...prev,
        date_of_service: postData.data.date_of_service,
      }});
      handleChildToParent(postData.data.date_of_service);
    }
    setLoading(false)
  };

  //call date submit function
  const submitDatefunction = async () => {
    const noteData = await postRequest(
      "/latest-notes",
      { client_id: userInfo.id },
      true
    );
    if (commonData.date_of_service != "Invalid date") {
    const postData = await postRequest(
      "/set-date-of-service",
      {
        client_document_id: viewEdit.client_document_id,
        date_of_service: commonData.date_of_service,
        client_id: userInfo.id,
        document_type: "progress_note",
      },
      true
    );
    // console.log("dateDAta", postData);
    if (postData) {
      setDateOfServices(postData.date_of_service);
      setViewEdit(prev => {
        return {
          ...prev,
          client_document_id: postData.client_document_id,
        }
      });
      setCommonData({
        ...commonData,
        date_of_service: postData.date_of_service,
        showError: false,
        isLoading: false,
        count: 1,
      });
      getDocData();
    }
    } else {
      setCommonData({
              ...commonData,
              showError: true,
              isLoading: false,
              count: 22,
            });
    }
    // if (noteData.status == true) {
    //   setCommonData({ ...commonData, showError: false, isLoading: true });
    //   if (commonData.date_of_service != "Invalid date") {
    //     const postData = await postRequest(
    //       "/set-date-of-service",
    //       {
    //         client_document_id: viewEdit.client_document_id,
    //         date_of_service: commonData.date_of_service,
    //         client_id: userInfo.id,
    //         document_type: "progress_note",
    //       },
    //       true
    //     );
    //     console.log("dateDAta", postData);
    //     if (postData) {
    //       setDateOfServices(postData.date_of_service);
    //       setViewEdit(prev => {
    //         return {
    //           ...prev,
    //           client_document_id: postData.client_document_id,
    //         }
    //       });
    //       setCommonData({
    //         ...commonData,
    //         date_of_service: postData.date_of_service,
    //         showError: false,
    //         isLoading: false,
    //         count: 1,
    //       });
    //       getDocData();
    //     }
    //   } else {
    //     setCommonData({
    //       ...commonData,
    //       showError: true,
    //       isLoading: false,
    //       count: 22,
    //     });
    //   }
    // } else {
    //   setCommonData({
    //     ...commonData,
    //     showError: false,
    //     isLoading: false,
    //     count: 1,
    //   });
    // }
  };

  //changeCommon data
  const changeCommonData = () => {
    if (viewEdit.client_document_id === 0) {
      setCommonData({ ...commonData, count: 2 });
    }
  };

  //check role and signed
  if (userInfo.user_role_slug == "clinician") {
    if (viewEdit.signed != 2 && viewEdit.supervisorSigned != 2) {
      if (userInfo.user_supervisor_id) {
        if (viewEdit.signed == 1) {
          checkSigned = 3;
          supervisorSigned = 4;
          showSigned = 1;
          //REQUEST
        } else if (viewEdit.supervisorSigned == 2) {
          checkSigned = 4;
          supervisorSigned = 2;
          showSigned = 1;
          //SIGNED
        } else {
          checkSigned = 3;
          supervisorSigned = 4;
          showSigned = 0;
          //NOTHING
        }
        //REQUEST
      } else {
        checkSigned = 2;
        supervisorSigned = 2;
        showSigned = 1;
        //SIGNED
      }
    } else {
      checkSigned = 2;
      supervisorSigned = 2;
      showSigned = 1;
    }
  } else if (userInfo.user_role_slug == "supervisor") {
    if (viewEdit.signed == 3) {
      checkSigned = 4;
      supervisorSigned = 2;
      showSigned = 1;
    } else if (viewEdit.signed == 1) {
      checkSigned = 2;
      supervisorSigned = 2;
      showSigned = 1;
    } else {
      checkSigned = 2;
      supervisorSigned = 2;
      showSigned = 1;
    }
  } else if (userInfo.user_role_slug == "account") {
    // if (viewEdit.signed == 1 && viewEdit.supervisorSigned == 1) {
    //   checkSigned = 2;
    //   supervisorSigned = 2;
    //   showSigned = 1;
    // } else if (viewEdit.supervisorSigned == 2) {
    //   checkSigned = 2;
    //   supervisorSigned = 2;
    //   showSigned = 1;
    // } else {
    //   checkSigned = 0;
    //   supervisorSigned = 0;
    //   showSigned = 0;
    // }
    if (viewEdit.signed == 3) {
      checkSigned = 4;
      supervisorSigned = 2;
      showSigned = 1;
    } else if (viewEdit.signed == 1) {
      checkSigned = 2;
      supervisorSigned = 2;
      showSigned = 1;
    } else {
      checkSigned = 2;
      supervisorSigned = 2;
      showSigned = 1;
    }
  }
  const [loading, setLoading] = useState(false)
  //get Update Progress Note Doc Data
  const getDocData = async (data) => {
    const postData = await postRequest(
      "/get-progressNote-document-data",
      { client_id: userInfo.id },
      true
    );
    // console.log(
    //   "get-progressNote-document-data before",
    //   postData,
    //   commonData,
    //   data
    // );
    if (postData) {
      if (postData.status) {
        const updateData = {};
        if (data) {
          updateData.date_of_service = data.date_of_service;
          updateData.sessionDuration = data.session_duration;
          // console.log(">?>after data", updateData);
        }

        updateData.replicateNoteData = postData.data;
        updateData.showError = false;
        updateData.count = 1;

        // console.log("before update", updateData);
        setCommonData({ ...commonData, ...updateData });
      }
    } 
    // console.log("get-progressNote-document-data after", postData, commonData);
  };

  // getFields
  const getFields = async(e) => {
    const getFrontData = commonData.replicateNoteData.find(
      (f) => f.id == e.target.value
    );
    // console.log(getFrontData,'getFrontDatagetFrontData')
    setCommonData({
      ...commonData,
      // date_of_service: getFrontData.date_of_service,
      sessionDuration: getFrontData.session_duration,
      count: 1,
    });
   
      
    if (getFrontData) {
      const apiPayload = {...JSON.parse(getFrontData.front_json),client_document_id:viewEdit.client_document_id, highlightedWordsId: '',highlightedWords: ''};
      const postdata = await postRequest(URL, apiPayload, true);
      if (postdata) {
        setViewEdit(prev => {
          return {
            ...prev,
            editData: getFrontData ? JSON.parse(getFrontData.front_json) : "",
          }
        });
        setStatement(getFrontData ? getFrontData.paragraph : "");
          // setStatement(postdata.paragraph);
          // if (setDurations) {
          //     setDurations(postdata.session_duration)
          // }
          // if (setDateOfServices) {
          //     setDateOfServices(postdata.date_of_service)
          // }

          // setViewEdit(prev => ({...prev,...postdata}))
          // if (JsonData.clickCount < 1) {
          //     setJsonData(prevData =>({ ...prevData, clickCount: 1 }))
          // }
          // setJsonData(prevData =>({ ...prevData, isLoading: false }));
      }


      for (const key in JSON.parse(getFrontData.front_json)) {
      if (JSON.parse(getFrontData.front_json)[key]) {
        $(`#${key}`).prop("checked", JSON.parse(getFrontData.front_json)[key]);
        if (key.includes("_goal_")) {
          $(`.${key}collapse`).addClass("show");
        }
      }
    }
  }
    
    // setDefaultStatement(getFrontData ? getFrontData.paragraph : "");
    // setDateOfServices(e.target.value.date_of_service)
    // console.log(DateOfServices,'DateOfServices')
    // console.log(commonData.date_of_service,'CommonDAta DateOFService')
  };

  const getDateOfService = () => {
    return commonData.date_of_service;
  };
  //download
  const downloadDocument = async () => {
    let signatureText = "<div className='col-xs-12 mt-4'><hr />";

    if (Number(viewEdit.signed) === 2 || Number(viewEdit.supervisorSigned) === 2) {
      if (viewEdit.editBy || viewEdit.supervisorSigned) {
        signatureText += `<p>${viewEdit.signature ?? viewEdit.editBy}, signed this note and declared this information to be accurate and complete on ${viewEdit.editTime}</p>`;

        if (viewEdit.supervisor_signature) {
          signatureText += `<p>${viewEdit.signature ?? viewEdit.editBy}, signed this note and declared this information to be accurate and complete on ${viewEdit.editTime}</p>`;
        }
      }
    }
    signatureText += `</div>`;

    const postData = await postRequest(
      "/download-client-document-pdf",
      { 
        client_document_id: viewEdit.client_document_id,
        signature: signatureText
      },
      true
    );
    if (postData) {
      const link = document.createElement("a");
      link.target = "_blank";
      // link.href = Url + postData.split("/html")[1];
      link.href = postData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  /**
   * to get latest progress note data
   */
  const getProgressNote = async () => {
    const postData = await postRequest(
      "/latest-notes",
      { client_id: userInfo.id },
      true
    );
    if (postData) {
      // console.log("Latest notes data ================>>>>>>>>> postData",postData)
      let progressAssessmentJson = {
        name: "Progress",
        key: "parp",
        child: [],
      };
      if (postData.status) {
        // console.log('postData.status',postData.status)
        // console.log('postData.data.notesArr && postData.data.notesArr.length > 0',postData.data.notesArr, postData.data.notesArr.length > 0)
        // console.log(postData.data.notesArr && postData.data.notesArr.length > 0)

        if (postData.data.notesArr && postData.data.notesArr.length > 0) {
          let tmpGoal = [];
          for (let i in postData.data.notesArr) {
            for (let j in postData.data.notesArr[i]) {
              let tmpTag = document.createElement("div");
              tmpTag.innerHTML = postData.data.notesArr[i][j];

              if (j.includes("goal")) {
                tmpGoal.push({
                  name: tmpTag.innerText,
                  key: j,
                  for: "normal",
                  type: "checkbox",
                  child: [progressAssessment],
                });
              }
            }
          }
          progressAssessmentJson.child = tmpGoal;
          if (tmpGoal.length > 0) {
            progressAssessmentJson.child[tmpGoal.length - 1] = {
              ...progressAssessmentJson.child[tmpGoal.length - 1],
              notes: "true",
              notesText: [
                {
                  text: "hello",
                  show_text: false,
                },
              ],
              show_notes: true,
            };
          }
          setViewEdit(prev => {
            return { ...prev, notes_id: postData.data.notes_id }
          });
          // console.log("postData.data.notes_id",postData.data.notes_id)
        }
      }
      progressAssessmentJson.child = progressAssessmentJson.child.reverse();
      progressAssessmentJson.child.push({
        name: "note",
        key: "note",
        for: "inline-notes",
        textArea: true,
        type: "checkbox",
        placeholder: "Add your notes here",
      });
      const newJson = [...newJosnData];
      newJson.push(progressAssessmentJson);
      newJson.push(recomendation);

      setProgressNoteJson(newJson);
    }
  };

  const submitSessionDuration = async (sessionDuration) => {
    if (/^-?\d+$/.test(sessionDuration.target.value)) {
      setDurations(sessionDuration.target.value);
      // console.log("tif", sessionDuration.target.value);
      setCommonData({
        ...commonData,
        sessionDuration: sessionDuration.target.value,
        sessionDurationCheck: sessionDuration.target.value,
      });
      const postData = await postRequest(
        "/updateSessionDuration",
        {
          sessionDuration: sessionDuration.target.value,
          client_document_id: viewEdit.client_document_id,
        },
        true
      );
      if (postData) {
        // console.log("Submit Session Duration", postData);
      }
    } else {
      // console.log("telse", sessionDuration.target.value);
      setCommonData({ ...commonData, sessionDurationCheck: "" });
      if (sessionDuration.target.value === "") {
        const postData = await postRequest(
          "/updateSessionDuration",
          {
            sessionDuration: sessionDuration.target.value,
            client_document_id: viewEdit.client_document_id,
          },
          true
        );
        if (postData) {
          // console.log("Submit Session Duration", postData);
        }
      }
    }
    if (sessionDuration?.target?.value && payloadData) {
      payloadData.sessionDuration = sessionDuration.target.value;
      const postdata = await postRequest(URL, payloadData, true);
      if (postdata) {
        setStatement(postdata.paragraph);
        // setDefaultStatement(postdata.paragraph);
      }
    }
  };

  const onOptimiseSessiondHandleChange = debounce(submitSessionDuration, 2000);

  async function changeDateForService(e) {
    // console.log("Change Data eeeee", e)
    await setCommonData({
      ...commonData,
      date_of_service: moment(e).format("MM/DD/Y"),
    });
    setTimeout(() => {
      $("#startProgressbutton").trigger("click");
    });
    if (e) {
      payloadData.date_of_service = moment(e).format("MM/DD/Y");
      const postdata = await postRequest(URL, payloadData, true);
      // console.log(postdata);
      if (postdata) {
        setStatement(postdata.paragraph);
        // setDefaultStatement(postdata.paragraph);
      }
    }
  }
  useEffect(() => {
    if (editId > 0) {
      setEditableCheckBox();
    }
    getProgressNote();
  }, []);

  // React.useEffect(() => {
  //     const scrollDiv = document.getElementsByClassName('statementComponent__div')[0];
  //     scrollDiv.scrollTo(0, scrollDiv.offsetTop * 100)
  // }, [Statement])
  
  useEffect(() => {
    if (!viewEdit.confirmChange) {
      if ($(".scrollTODiv").length) {
        setTimeout(() => {
          $("#statementComponent__div_id_pn").animate({
            scrollTop:
              $("#statementComponent__div_id_pn").scrollTop() +
              ($(
                '#statementComponent__div_id_pn .scrollTODiv'
              ).offset()?.top -
                $("#statementComponent__div_id_pn").offset()?.top),
          });
        }, 20);
      }
    }
  },[Statement])

  // console.log('progress note json', ProgressNoteJson);
  return (
    <React.Fragment>
      <div className="row g-6 g-xl-9">
        {!viewEdit.confirmChange ? (
          <div className="col-lg-7 col-xxl-7 customUl">
            <div className="card h-100">
              <div className="card-body p-9">
                <div
                  className="row fv-row"
                  style={{
                    // position: "sticky",
                    // top: "7%",
                    zIndex: 99,
                    background: "#fff",
                    padding: 10,
                  }}
                >
                  <div className="col-xs-12 col-md-6">
                    <br />
                    <div className="px-4 py-2 row">
                      <div className="col-md-6 pr-0">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Date Of Service"
                            inputFormat="MM/dd/yyyy"
                            value={moment.utc(moment(commonData.date_of_service)).format()}
                            onChange={changeDateForService}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>

                      <div className="col-md-6 startEndDiv align-items-center pl-0">
                        {commonData.isLoading ? (
                          <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={50}
                            width={50}
                            timeout={300000}
                          />
                        ) : (
                          <button
                            className="btn btn-primary allNotes__dateOfServices__btn mx-2"
                            id="startProgressbutton"
                            onClick={submitDatefunction}
                            disabled={!commonData.date_of_service}
                          >
                            {commonData.count === 1 ? (
                              <i className="fas fa-pencil-alt" />
                            ) : (
                              "Start Progress Note"
                            )}
                          </button>
                        )}
                      </div>
                      {commonData.count == 11 ? (
                        <b className="text-danger">
                          Please create a Treatment Plan to start Progress Note.
                        </b>
                      ) : commonData.count == 22 ? (
                        <b className="text-danger h3">
                          Please Start Progress Note
                        </b>
                      ) : commonData.count > 1 ? (
                        <b className="text-danger h3">
                          Please Start Progress Note
                        </b>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-xl-3 py-2">
                    <div className="input-group">
                      <label className="form-label fw-bolder text-dark fs-6">
                        Session Duration
                      </label>
                      <input
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        disabled={viewEdit.client_document_id === 0}
                        defaultValue={commonData.sessionDuration}
                        onClick={() =>
                          viewEdit.client_document_id === 0
                            ? setCommonData({ ...commonData, count: 2 })
                            : null
                        }
                        onChange={
                          onOptimiseSessiondHandleChange
                          // submitSessionDuration
                          // commonData.replicateNoteData.length > 0
                          //     ? onOptimiseSessiondHandleChange
                          //     : ""
                        }
                        placeholder="15"
                        name="session_duration"
                        aria-describedby="basic-addon2"
                        autoComplete="off"
                        id="session_duration"
                      />
                      <div class="input-group-append">
                        <span
                          class="input-group-text form-control form-control-lg form-control-solid"
                          style={{
                            borderRadius: "initial",
                            paddingTop: "14px",
                          }}
                        >
                          Min
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 py-2">
                    <label className="form-label fw-bolder text-dark fs-6">
                      <span>Replicate note from:</span>
                    </label>
                    <select
                      name="replicateNote"
                      className="form-select form-select-solid"
                      data-control="select2"
                      data-hide-search="true"
                      onClick={() =>
                        viewEdit.client_document_id === 0
                          ? setCommonData(prev => {
                            return { ...prev, count: 2 }
                          })
                          : null
                      }
                      onChange={getFields}
                      data-placeholder="ComboBox"
                    >
                      {commonData.replicateNoteData.length > 0 ? (
                        <>
                          <option value="0">Select Document</option>
                          {commonData.replicateNoteData.map((e, i) => (
                            <option key={i} value={e.id}>
                              {e.date_of_service}
                            </option>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </select>
                  </div>
                  <div className="col-xs-12 col-md-12 text-center" style={{height:"20px"}}>
                  {loading &&  <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={30}
                            width={30}
                            timeout={300000}
                          /> }
                  </div>
                </div>
                <div
                  className="row fv-row mb-5"
                  style={{
                    position: "sticky",
                    top: "7%",
                    zIndex: 99,
                    background: "#fff",
                    padding: 10,
                  }}
                >

                  <div className="col-xs-12 col-md-12">
                    <div className="card-title">
                      <div className="d-flex align-items-center position-relative my-1">
                        <span className="svg-icon svg-icon-1 position-absolute ms-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              opacity="0.5"
                              x="17.0365"
                              y="15.1223"
                              width="8.15546"
                              height={2}
                              rx={1}
                              transform="rotate(45 17.0365 15.1223)"
                              fill="black"
                            />
                            <path
                              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <input
                        ref={searchRef}
                          type="text"
                          id="searchContent"
                          className="form-control form-control-solid w-90% ps-15"
                          placeholder="Search Keyword..."
                          onChange={onOptimisedHandleChange}
                          disabled={commonData.count === 1 ? false : true}
                        />
                        <button
                          style={{
                            backgroundColor: "#f5f8fa",
                            borderColor: "transparent",
                            borderRadius: 0,
                            padding: 10,
                          }}
                          onClick={clearSearch}
                          disabled={commonData.count === 1 ? false : true}
                        >
                        x
                        </button>
                        <div
                          style={{
                            backgroundColor: "#f5f8fa",
                            borderColor: "#f5f8fa",
                            borderRadius: 0,
                            padding: 12,
                          }}
                        >
                          {totalSearch == 0 ? 0 : selectedSearchIndex + 1}/
                          {totalSearch}
                        </div>
                        <span
                        className="searchIndexUpDown"
                          style={{ padding: 10,}}
                          onClick={() => onSelectedSearchIndex("up")}
                        >
                          {/* <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697L11.4697 7.46967C11.7626 7.17678 12.2374 7.17678 12.5303 7.46967L18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303L12 9.06066L6.53033 14.5303C6.23744 14.8232 5.76256 14.8232 5.46967 14.5303Z"
                              fill="#030D45"
                            />
                          </svg> */}
                          Prev
                        </span>
                        <span
                        className="searchIndexUpDown"
                          style={{ padding: 10 }}
                          onClick={() => onSelectedSearchIndex("down")}
                        >
                          {/* <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                              fill="#030D45"
                            />
                          </svg> */}
                          Next
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column fv-row mb-7" style={{"position":"relative"}}>
                {searchLoader && <div style={{"position":"absolute","height":"100%","width":"100%","display":"flex",justifyContent:"center",alignItems:"center","backdrop-filter":" blur(2px)","z-index":"99999"}}>
                         <Loader
                            type="ThreeDots"
                            color="#ffffff"
                            height={50}
                            width={50}
                            timeout={300000}
                          />
                </div>
              }
                  {/* {console.log(selectAllData)} */}

                  <Pare
                    selectAllData={selectAllData}
                    setStatement={(e) => {
                      setStatement(e)
                      // setDefaultStatement(e)
                    }}
                    setDurations={(z) => setDurations(z)}
                    setDateOfServices={(x) => setDateOfServices(x)}
                    setStatusCollapse={statusCollapse}
                    viewEdit={viewEdit}
                    setViewEdit={(e) =>
                      setViewEdit(prev => {
                        return { ...prev, client_document_id: e.client_document_id, is_updated: e.is_updated }
                      })
                    }
                    setAllData={setData}
                    data={ProgressNoteJson}
                    URL={URL}
                    editMode={viewEdit.editData}
                    notes_id={viewEdit.notes_id}
                    commonData={{ commonData, changeCommonData }}
                    setpayloadsData={setPayloadData}
                    dataChildToParent={editDataofServies}
                    getDateOfService={getDateOfService}
                    // dateOFSERVICE ={setEditDate}
                    setSentenceLoader={setSentenceLoader}
                    setCheckboxLoader={setCheckboxLoader}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`col-lg-${!viewEdit.confirmChange ? 5 : 12} col-xxl-${
            !viewEdit.confirmChange ? 5 : 12
          }`}
        >
          <div
            className="card h-100"
            style={{ position: "sticky", top: "70px" }}
          >
            <div className="card-body p-9">
            { sentenceLoader && <div style={{
                                        position:'absolute',
                                        top:0,
                                        left:0,
                                        height:"100%",
                                        width:"100%",
                                        "backdrop-filter": "blur(1.5px)" }}>
                                      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%", width:"100%",}}>
                                        <Loader
                                          type="ThreeDots"
                                          color="#017EAD"
                                          height={50}
                                          width={50}
                                          timeout={300000} />
                                      </div>
                                </div>
              }
              {viewEdit.confirmChange &&
              <div className="d-flex gap-2 justify-content-end align-items-center">
                <h3 className="m-0 text-primary-emphasis">Change language: </h3>
                <button class="btn btn-primary" style={{padding: "5px 10px 5px 15px"}} onClick={() => {
                  // console.log()
                  setStatement(defaultStatement)
                  setViewEdit(prev => {
                    return {
                      ...prev,
                      wordsReplaced:false,
                    }
                  })
                  }}>
                  Default
                </button>
                {/* <button class="btn btn-primary" style={{padding: "5px 10px 5px 15px"}} onClick={() => {
                  const newSentence = keepSentenceBetweenSpecificWords(sentence, "MSE", "Goal 1:")
                  console.log("sentence",Statement)
                  console.log("newSentence",newSentence)
                }}>
                  Option NA
                </button> */}
                <button class="btn btn-primary" style={{padding: "5px 10px 5px 15px"}} onClick={() => replaceWords(defaultStatement,replaceWords1)}>
                  Option 1
                </button>
                <button class="btn btn-primary" style={{padding: "5px 10px 5px 15px"}} onClick={() => replaceWords(defaultStatement,replaceWords2)}>
                  Option 2
                </button>
              </div>
              }
              <div className="">
                {viewEdit.confirmChange ? (
                  viewEdit.diagnosis ? (
                    <div>
                      <h2>Diagnosis</h2>
                      {viewEdit.diagnosis.map((e) => {
                        return e.diagnosis !== null ? (
                          <div className="d-inline-block bg-grey rounded selected_diagnosis m-2">
                            <div className="d-flex selected_diagnosis__div">
                              <p>{e.diagnosis.name} </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                      <hr />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="cust__diagnosis_addNew_spaceBet fv-row mb-7">
                <label className="form-label  text-dark fs-6">
                  <span class="fw-bolder">{userInfo.full_name}</span>
                  <br />
                  {Statement ? (
                    <span>
                      <span class="fw-bolder">DOB:</span>{" "}
                      {moment(userInfo.dob).format("MM/DD/Y")}
                    </span>
                  ) : null}
                </label>
                <label
                  className="form-label  text-dark fs-6"
                  style={{ textAlign: "end" }}
                >
                  <span class="fw-bolder">Progress Note</span>
                  <br />
                  {Statement ? (
                    <div>
                      {DateOfServices || commonData.date_of_service ? (
                        <label>
                          <span class="fw-bolder">Date Of Service: </span>{" "}
                          {moment(
                            DateOfServices
                              ? DateOfServices
                              : commonData.date_of_service
                          ).format("MM/DD/Y")}
                        </label>
                      ) : null}
                      <br />
                      {Durations || commonData.sessionDuration ? (
                        <label>
                          <span class="fw-bolder">Session Duration: </span>{" "}
                          {Durations ? Durations : commonData.sessionDuration}{" "}
                          Minutes
                        </label>
                      ) : null}
                    </div>
                  ) : null}
                </label>
              </div>
              <div
                className="d-flex flex-column scroll_statement_div statementComponent__div fv-row mb-7"
                id="statementComponent__div_id_pn"
                style={{ maxHeight: "500px","scrollPaddingTop":"50px" }}
              >
                {viewEdit.confirmChange ? (
                  <CKEditor
                    editor={ClassicEditor}
                    name="test"
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                      ],
                    }}
                    data={Statement}
                    onChange={(event, editor) => {
                      setStatement(editor.getData())
                    //   if(!viewEdit.wordsReplaced){
                    //   setDefaultStatement(editor.getData())
                    // }
                    }}
                  >
                    {" "}
                  </CKEditor>
                ) : (
                  <div
                    className="fs-6 text-dark form-label mb-0"
                    id="progressNote"
                    // ref={containerRef}
                  >
                    <div
                      style={{ fontSize: "16px" }}
                      dangerouslySetInnerHTML={{ __html: Statement }}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex flex-wrap fv-row mb-7">
                {Statement !== "" ? (
                  <button
                    className="btn btn-primary btn-sm me-3 mb-3"
                    onClick={() => {
                      setViewEdit(prev => {
                        return { ...prev, viewStatement: true }
                      });
                    }}
                  >
                    View
                  </button>
                ) : (
                  ""
                )}
                {viewEdit.confirmChange ? (
                  <button
                    className="btn btn-info btn-sm me-3 mb-3"
                    onClick={() => saveStatement()}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-info btn-sm me-3 mb-3"
                    disabled={Statement == "" ? true : false}
                    onClick={() =>
                      setViewEdit(prev => {
                        return { ...prev, confirmSave: true }
                      })
                    }
                  >
                    Save
                  </button>
                )}
                {viewEdit.confirmChange ? (
                  ""
                ) : (
                  <button
                    className="btn btn-danger btn-sm me-3 mb-3"
                    disabled={Statement == "" ? true : false}
                    onClick={() =>
                      setViewEdit(prev => {
                        return { ...prev, showModal: true }
                      })
                    }
                  >
                    Manually edit
                  </button>
                )}
                {(Statement !== "" || (showSigned == 0 || viewEdit.is_updated !== 0) ) ? (
                  // && showSigned !== 0
                  //showing Sign off button display when edit
                  <button
                    className="btn btn-success btn-sm me-3 mb-3"
                    onClick={() =>
                      setSignOff({
                        ...SignOff,
                        signOff: true,
                        supervisor_signed: supervisorSigned,
                        signed: checkSigned,
                      })
                    }
                  >
                    {/* {checkSigned === 3 ? "Sign Request" : (supervisorSigned == 2 && checkSigned == 2) ? "Sign Request" :"Sign Doc"} */}
                    {
                                                checkSigned === 3
                                                    ? 'Sign Request'
                                                    : 'Sign Doc'
                                            }
                  </button>
                ) : (
                  ""
                )}
                {
                  <button
                    className="btn btn-warning btn-sm me-3 mb-3"
                    onClick={downloadDocument}
                    disabled={Statement === ""}
                  >
                    <i
                      className="fa fa-file-download"
                      style={{ width: "10px" }}
                    ></i>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
        <CustModal
          show={viewEdit.showModal}
          close={() => setViewEdit(prev => {
            return { ...prev, showModal: false }
          })}
          header="Are you sure you would like to manually edit your text now?"
        >
          <div className="row">
            <div className="col-xs-12">
              <div className="h5">
                Are you sure you want to manually edit your document? Once you
                do, you will no longer have access to the keywords.
              </div>
            </div>
            <div className="col-xs-12 mt-4">
              <div className="">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>{
                    setDefaultStatement(Statement)
                      setViewEdit(prev => {
                      return {
                      ...prev,
                      showModal: false,
                      confirmChange: true,
                    }
                    })
                  }
                  }
                >
                  Yes, manually edit
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => setViewEdit(prev => {
                    return { ...prev, showModal: false }
                  })}
                >
                  No, return to keyword selections
                </button>
              </div>
            </div>
          </div>
        </CustModal>
        <CustModal
          show={SignOff.signOff}
          close={() => setSignOff({ ...SignOff, signOff: false })}
          header="Alert!"
          size="sm"
        >
          <div className="row">
            <div className="col-xs-12">
              <h4>
                Are you sure you would like to{" "}
                {checkSigned === 3 ? "send Sign Request" : "sign doc"} ?
              </h4>
            </div>
            <div className="col-xs-12 mt-4">
              <div className="">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => signOffFun()}
                >
                 Confirm
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => setSignOff({ ...SignOff, signOff: false })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </CustModal>

        <CustModal
          show={viewEdit.viewStatement}
          close={() => setViewEdit(prev => {
            return { ...prev, viewStatement: false }
          })}
          header={userInfo.full_name}
          size="lg"
          centerHeader="Progress Note"
        >
          <div className="row">
            {/* <div className="col-xs-12">                            
                            {
                                viewEdit.diagnosis
                                ? <div>
                                    <h4>Diagnosis</h4>
                                    {
                                        viewEdit.diagnosis.map((e) => {
                                            return e.diagnosis !== null
                                                ? <div className='d-inline-block bg-grey rounded selected_diagnosis m-2'>
                                                    <div className='d-flex selected_diagnosis__div'>
                                                        <p>{e.diagnosis.name}  </p>
                                                    </div>
                                                </div>
                                                : ""
                                        }
                                        )
                                    }
                                    <hr />
                                </div>
                                : ""
                            }
                        </div> */}
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={{ __html: Statement }} />
            </div>
            {viewEdit.signed == 2 || viewEdit.supervisorSigned == 2 ? (
              <div className="col-xs-12 mt-4">
                <hr />
                {viewEdit.editBy || viewEdit.supervisorSigned ? (
                  <>
                  <p>
                    {(viewEdit.signature ?? viewEdit.editBy) +
                      ", signed this note and declared this information to be accurate and complete on " +
                      viewEdit.editTime}
                  </p>
                  {viewEdit.supervisor_signature == null ? "" :  
                  <p>
                    {(viewEdit.signature ?? viewEdit.editBy) +
                      ", signed this note and declared this information to be accurate and complete on " +
                      viewEdit.editTime}
                  </p>
}
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <div className="col-xs-12 mt-4">
              <hr />
              <div className="">
                <button
                  className="btn btn-primary rounded-sm mx-2"
                  onClick={() =>
                    setViewEdit(prev => {
                      return { ...prev, viewStatement: false }
                    })
                  }
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </CustModal>

        <CustModal
          show={viewEdit.confirmSave}
          close={() => setViewEdit(prev => {
            return { ...prev, confirmSave: false }
          })}
          header="Success"
          size="sm"
        >
          <div className="row">
            <div className="col-xs-12">
              <h4>Document is saved</h4>
            </div>
            <div className="col-xs-12 mt-4">
              <div className="">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => changePage({ id: 6 })}
                >
                  Go to Profile
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() =>
                    setViewEdit(prev => {
                      return { ...prev, confirmSave: false }
                    })
                  }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </CustModal>
      </div>
    </React.Fragment>
  );
}
