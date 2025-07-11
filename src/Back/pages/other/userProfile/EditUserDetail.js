import React, { useContext, useState, useEffect } from "react";
import { UserInformation } from "./MyProfile";
import { getRequest, postRequest } from "../../CustomHttp";
import { setSession, getUser } from "../../Session";

function EditUserDetail(props) {
    const {userDetail, setUserDetail} = useContext(UserInformation);
    const Role = userDetail.role_name;      
    const [UserData, setUserData] = useState(userDetail);    
    const initiCityState = {city: userDetail.phy_city, state: userDetail.phy_state};    


    //React: state start
    const [LocalState, setLocalState] = useState([]);
    const [LocalCity, setLocalCity] = useState([]);
    const [cityAndState, setCityAndState] = useState(initiCityState);
    //React: state end

    //load state list
    const loadState = async () => {
        var myData = await getRequest('/state');
        if(myData) {
            setLocalState(myData.data);   
            loadCity(cityAndState.state);
        }
    }

    //load city list
    const loadCity = async (stateId) => {                   
        let passData = {
            'state' : stateId,
        };

        if(stateId === 0){
            setLocalCity([]);
        }else{
            var myCities = await postRequest('/city', passData);
            if(myCities.status) {                              
                setLocalCity(myCities.data);                
            }           
        }
    }

    const changeUserData = (e) => {
        setUserData({...UserData, ...e});
    }

    //
    const submitUserProfile = async () => {
        let isValidate = window.editProfileFormValidation();
        if(isValidate) {
            const Url = '/update-profile';
            const postData = UserData;
            const sentRequest = await postRequest(Url, postData, true);
            if (sentRequest) {
                if (sentRequest.status) {
                    setUserDetail({...postData, ...sentRequest.data});
                    const Token = getUser().token;
                    setSession('userData', {...postData, token: Token});
                    props.close();
                } else {
                    props.errorMessage.showAlert(true);
                    props.errorMessage.alertMessage(sentRequest);
                }
            }
        }
    }

    //React: LifeCycle Hook
    useEffect(() => {
        loadState();              
        return () => {
            //cleanup
        }
    }, [])

  return (    
      <>
      <form className="form" id="editProfileForm" method="post">
      <div
        class="scroll-y me-n7 pe-7"
        id="kt_modal_add_customer_scroll"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies="#kt_modal_add_customer_header"
        data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
        data-kt-scroll-offset="300px"
      >
        <div class="row fv-row mb-7">
          <div class="col-xl-6">
              <label class="form-label text-dark fs-6"><span className="required">First Name</span></label>
            <input
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder="Susan"
              name="first_name"
              autocomplete="off"
              value={ UserData.first_name ?? '' }
              onChange={(e) => changeUserData({first_name: e.target.value})}
            />
          </div>
          <div class="col-xl-6">
              <label class="form-label text-dark fs-6"><span className="required">Last Name</span></label>
            <input
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder="Smith"
              name="last_name"
              autocomplete="off"
              value={ UserData.last_name ?? '' }
              onChange={(e) => changeUserData({last_name: e.target.value})}
            />
          </div>
        </div>
        <div class="row fv-row mb-7">
          <div class="col-xl-12">
            <label class="form-label text-dark fs-6">
              <span class="required">Email</span>
            </label>
            <input
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder="SusanSmith@gmail.com"
              name="email"
              autocomplete="off"
              value={ UserData.email ?? '' }
              onChange={(e) => changeUserData({email: e.target.value})}              
            />
          </div>                    
        </div>
        {
            Role == 'Admin'
            ? null
            : <>
              <div class="row fv-row mb-7">
                <div class="col-xl-6">
                  <label class="form-label text-dark fs-6">
                    <span class="">Practice Name</span>
                  </label>
                  <input
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Practice0001"
                    name="practice_name"
                    autocomplete="off"
                    readonly=""
                    value={ UserData.practice_name ?? '' }
                    onChange={(e) => changeUserData({practice_name: e.target.value})}
                  />
                </div>
                <div class="col-xl-6">
                    <label class="form-label text-dark fs-6"><span className="required">User Name</span></label>
                  <input
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="User@123"
                    name="username"
                    value={ UserData.username ?? '' }
                    onChange={(e) => changeUserData({username: e.target.value})}
                    autocomplete="off"
                  />
                </div>
                {
                  UserData.role == 'account'
                  ? <div className="col-xl-12 mt-7">
                      <label className="form-label text-dark fs-6">Company Name</label>
                      <input
                          className="form-control form-control-lg form-control-solid"
                          type="text"
                          placeholder="John Doe"
                          name="company_name"
                          value={UserData.company_name ?? ''}
                          onChange={(e) => changeUserData({company_name: e.target.value})}
                          autoComplete="off"
                      />
                  </div>
                  : null
                }                
              </div>
              <div className="row fv-row mb-7">
              <div class="col-xl-12">
                  <label class="form-label text-dark fs-6">
                    <span class="required">Signature</span>
                  </label>
                  <input
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Susan"
                    name="signature"
                    autocomplete="off"
                    value={ UserData.signature ?? '' }
                    onChange={(e) => changeUserData({signature: e.target.value})}
                  />
                </div>
              </div>
              <div class="row fv-row mb-7">
              <div class="col-xl-6">
                <label class="form-label text-dark fs-6">Phone Number</label>
                <input
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="877865565"
                  name="phone_number"
                  value={ UserData.phone_number ?? '' }
                  onChange={(e) => changeUserData({phone_number: e.target.value})}
                  autocomplete="off"
                />
                </div>
                <div class="col-xl-6">
                  <label class="align-items-center fs-6 text-dark  form-label mb-2">
                    Physical Address
                  </label>
                  <input type={'text'}
                    class="form-control form-control-solid"
                    placeholder="123 Prairie Road Richmond, VA 23233"
                    name="phy_address"
                    value={ UserData.phy_address ?? '' } 
                    onChange={(e) => changeUserData({phy_address: e.target.value})}
                    />
                  <div class="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>   
              <div class="row fv-row mb-7">          
                <div class="col-xl-6">
                  <label class="form-label text-dark fs-6">State</label>
                  <select
                    name="phy_state"
                    class="form-select form-select-solid"
                    data-control="select2"
                    data-hide-search="true"
                    data-placeholder="State"
                    value={cityAndState.state}              
                    onChange={(e) => { setCityAndState({...cityAndState, state: e.target.value}); loadCity(e.target.value); changeUserData({phy_state: e.target.value }) }}
                  >              
                    <option value={0}>Select State</option>
                    {
                        LocalState.map((e) => (
                              <option key={ e.id+'_'+e.name } value={ e.id }>{ e.name }</option>
                          )
                        )
                    }
                  </select>
                </div>
                <div class="col-xl-6">
                  <label class="form-label text-dark fs-6">City</label>
                  <select
                    name="phy_city"
                    class="form-select form-select-solid"
                    data-control="select2"
                    data-hide-search="true"
                    data-placeholder="City"
                    value={cityAndState.city}
                    onChange={(e) => { setCityAndState({...cityAndState, city: e.target.value}); changeUserData({phy_city: e.target.value}) }}
                  >
                  <option value={0}>Select City</option>                      
                    { 
                      LocalCity.map((e) => (
                          <option key={ e.id+'_'+e.city } value={ e.id }>{ e.city }</option>
                        )
                      )
                    }
                  </select>
                </div>
              </div>
              <div class="row fv-row mb-7">
                <label class="form-label text-dark fs-6">Zipcode</label>
                <input
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="432345"
                  name="phy_zipcode"
                  value={ UserData.phy_zipcode ?? '' }
                  onChange={(e) => changeUserData({phy_zipcode: e.target.value})}
                  autocomplete="off"
                />
              </div>
              </>
        }
      </div>    
      <button type="button" id="kt_modal_add_customer_submit" class="btn btn-primary" onClick={() => submitUserProfile()}>Submit</button>
          </form>
      </>
  );
}

export default EditUserDetail;
