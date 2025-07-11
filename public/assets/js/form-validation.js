function loginFormValidation() {
    var loginForm = $("#loginForm");    
    //login
    loginForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            loginPracticeName: {
                required: true,
            },
            loginUsername: {
                required: true,
                minlength: 6,
            },
            loginPassword: {
                required: true,
                minlength: 6,
            }
        }, messages : {
            loginPracticeName: {
                required: "Practice name is required",
            },
            loginUsername: {
                required: "Username is required",
                minlength: "Invalid username",
            },
            loginPassword: {
                required: "Password is required",
                minlength: "Invalid password",
            }
        }
    });
    
    if(loginForm.valid()){
        //loginForm[0].submit();
        //$("#loginForm")[0].submit()
        return true;
    } else {
        window.scrollTo(250, 250);
        return false;
    }
}

function changeDOBFormValidation() {
    var changeDOBForm = jQuery("#changeDOBForm");
    //login
    changeDOBForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            date: {
                required: true,
            },
        }, messages : {
            date: {
                required: "Date of birth is required",
            }
        }
    });

    // console.log(changeDOBForm, changeDOBForm.valid());
    if(changeDOBForm.valid()){
        return true;
    } else {
        return false;
    }
}

function changePronounsFormValidation() {
    var changePronounsForm = $("#changePronounsForm");

    changePronounsForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            'pronouns[]' : {
                required: true
            }
        }, messages : {
            'pronouns[]': "Please select at least one pronouns"
        } , errorPlacement: function(error, element)
        {
            if ( element.is(".form-check-input")) {
                error.appendTo("#error-pronouns-individual");
            } else {
                error.insertAfter( element );
            }
        }
    });

    if(changePronounsForm.valid()){
        return true;
    } else {
        return false;
    }
}

function editProfileFormValidation() {
    var editProfileForm = $("#editProfileForm");

    //login
    editProfileForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            practice_name: {
                required: true,
            },
            signature:{
                required: true,
            },
            username: {
                required: true,
                minlength: 6,
            },
        }, messages : {
            first_name: {
                required: "First name is required",
            },
            last_name: {
                required: "Last name is required",
            },
            email: {
                required: "Email is required",
                email: "Invalid email address",
            },
            practice_name: {
                required: "Practice name is required",
            },
            signature: {
                required: "Signature is required",
            },
            username: {
                required: "Username is required",
                minlength: "Username must be grater then 6 digit",
            },
        }
    });

    if(editProfileForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

// Define the custom validation method for the promo code
$.validator.addMethod("validPromoCode", function(value, element) {
    // Array of valid promo codes
    const validPromoCodes = ['NN60FREE', 'NN60FREEJS'];
    // If the field is empty, return true (valid)
    if (!value) {
        return true;
    }
    // Otherwise, check if the promo code is in the array of valid promo codes
    return validPromoCodes.includes(value);
}, "Invalid promo code.");

function registerFormValidation() {
    var registerForm = $("#registerForm");
    //register
    registerForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            practice_name: {
                required: true,
            },
            signature: {
                required: true,
            },
            username: {
                required: true,
                minlength: 6,
            },
            password: {
                required: true,
                minlength: 6,
            },
            password2: {
                required: true,
                minlength: 6,
            },
            promo_code: {
                validPromoCode: true,
            },
            card_name: {
                required: true,
            },
            card_number: {
                required: true,
                number: true,
                maxlength: 12,
                minlength: 12,
            },
            card_expiry_month: {
                required: true,
                number: true,
            },
            card_expiry_year: {
                required: true,
                number: true,
            },
            card_cvv: {
                required: true,
                number: true,
                maxlength: 4,
                minlength: 3,
            },
            toc : {
                required: true,
            },
            pp: {
                required: true,
            },
            ba: {
                required: true,
            },
            qacd : {
                required: true,
            }
        }, messages : {
            first_name: {
                required: "First name is required",
            },
            last_name: {
                required: "Last name is required",
            },
            email: {
                required: "Email is required",
                email: "Invalid email address",
            },
            practice_name: {
                required: "Practice name is required",
            },
            signature: {
                required: "Signature is required",
            },
            username: {
                required: "Username is required",
                minlength: "Username must be greater than 6 digit",
            },
            password: {
                required: "Password is required",
                minlength: "Password must be greater than 6 digit",
            },
            password2: {
                required: "Re-enter Password is required",
                minlength: "Password must be greater than 6 digit",
            },
            promo_code: {
                validPromoCode: "Invalid promo code."
            },
            card_name: {
                required: "Card name is required",
            },
            card_number: {
                required: "Card number is required",
                number: "Card number must be digit only",
                maxlength: "Card number must be 12 digit",
                minlength: "Card number must be 12 digit",
            },
            card_expiry_month: {
                required: "Expiry month is required",
                number: "Expiry month must be a number",
            },
            card_expiry_year: {
                required: "Expiry year is required",
                number: "Expiry year must be a number",
            },
            card_cvv: {
                required: "CVV is required",
                number: "CVV is must be number",
                maxlength: "Invalid CVV",
                minlength: "Invalid CVV",
            },
            toc : {
                required: "Please, Read and Agree to all of the terms and conditions",
            },
            pp: {
                required: "Please, Read and Agree to all of the privacy policy",
            },
            ba: {
                required: "Please, Read and Agree to all of the business associate agreement",
            },
            qacd : {
                required: "Please, Read and Accept quality and content of my documentation",
            }
        },
        errorPlacement: function(error, element)
        {
            if ( element.is("#card_expiry_month")) {
                error.appendTo( element.parents('.card_expiry_month_container'));
            } else if ( element.is("#card_expiry_year")) {
                error.appendTo( element.parents('.card_expiry_year_container'));
            } else if ( element.is("#toc")) {
                error.appendTo( element.parents('label').parents(".toc_container"));
            } else if (element.is("#pp")) {
                error.appendTo(element.parents('label').parents(".pp_container"));
            } else if (element.is("#ba")) {
                error.appendTo(element.parents('label').parents(".ba_container"));
            } else if ( element.is("#qacd")) {
                error.appendTo( element.parents('label').parents(".qacd_container"));
            } else {
                error.insertAfter( element );
            }
        }
    });
    
    if(registerForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

function ForgotUsernameFormValidation() {
    var ForgotUsernameForm = $("#ForgotUsernameForm");

    //register
    ForgotUsernameForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            forgotPracticeEmail: {
                required: true,
                email: true,
            }
        }, messages : {
            forgotPracticeEmail: {
                required: "Email is required",
                email: "Invalid email address",
            }
        }
    });

    if(ForgotUsernameForm.valid()){
        return true;
    } else {
        return false;
    }
}

function ForgotPasswordFormValidation() {
    var ForgotPasswordForm = $("#ForgotPasswordForm");

    //register
    ForgotPasswordForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            forgotPracticeName: {
                required: true
            },
            forgotUsername: {
                required: true
            }
        }, messages : {
            forgotPracticeName: {
                required: "Practice Name is required"
            },
            forgotUsername: {
                required: "Username is required"
            }
        }
    });

    if(ForgotPasswordForm.valid()){
        return true;
    } else {
        return false;
    }
}

function newPasswordFormValidation() {
    var newPasswordForm = $("#newPasswordForm");
    newPasswordForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            forgotNewPassword: {
                required: true,
                minlength: 6,
            },
            forgotConfirmPassword: {
                required: true,
                minlength: 6,
                equalTo : "#forgotNewPassword"
            }
        }, messages : {
            forgotNewPassword: {
                required: "Password is required",
                minlength: "Password must be greater than 6 digit",
            },
            forgotConfirmPassword: {
                required: "Confirm password is required",
                minlength: "Password must be greater than 6 digit",
                equalTo : "Confirm password does not match"
            }
        }
    });

    if(newPasswordForm.valid()){
        return true;
    } else {
        return false;
    }
}

function clientFormValidation() {
    var clientForm = $("#clientForm");

    //register
    clientForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            preferredName: {
                required: true
            },
            dob: {
                required: true
            },
            'pronouns[]' : {
                required: true
            },
            gender: {
                required: true
            }
        }, messages : {
            firstName: "First name is required",
            lastName: "Last name is required",
            preferredName: "Preferred name is required",
            dob: "Date of birth is required",
            'pronouns[]': "Please select at least one pronouns",
            gender: "Gender is required"
        }, errorPlacement: function(error, element)
        {
            // console.log('element',element);
            if ( element.is(".form-check-input")) {
                error.appendTo("#pronounsError");
            } else if ( element.is(".form-select")) {
                error.insertAfter(element);
            } else {
                error.insertAfter( element );
            }
        }
    });

    if(clientForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

function addAccountFormValidation() {
    var addAccountForm = $("#addAccountForm");

    addAccountForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email:true,
            },
            password: {
                required: true,
                minlength: 6,
            },
            username: {
                required: true,
                minlength: 6,
            },
            practice_name: {
                required: true,
            },
        }, messages : {
            first_name: {
                required: "First name is required",
            },
            last_name: {
                required: "Last name is required",
            },
            email: {
                required: "Email is required",
                email:"Invalid email",
            },
            password: {
                required: "Password is required",
                minlength: "Password must be greater than 6 digit",
            },
            username: {
                required: "Username is required",
                minlength: "Username must be greater than 6 digit",
            },
            practice_name: {
                required: "Practice name is required",
            },
        }
    });

    if(addAccountForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

function contactUsValidation(){
    var contactUsForm = $("#ContactUsForm");

    contactUsForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            full_name: {
                required: true,
            },          
            email: {
                required: true,
                email:true,
            },
           message: {
               required: true
           }
        }, messages : {
            full_name: {
                required: "Full Name Is Required",
            },       
            email: {
                required: "Email is required",
                email:"Invalid email",
            },
           message: {
                required: "Message is required",
           }
        }
    });

    if(contactUsForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

function subscribeValidation(){
    var subscribeForm = $("#SubscribeForm");

    subscribeForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {       
            email: {
                required: true,
                email:true,
            },
        }, messages : {   
            email: {
                required: "Email is required",
                email:"Invalid email",
            },
        }
    });

    if(subscribeForm.valid()){
        return true;
    } else {
        window.scrollTo(0, 0);
        return false;
    }
}

function addClinicianFormValidation(){
    const addClinicianForm = $('#addClinicianForm');
    addClinicianForm.validate({
        ignore: "",
        errorElement: "em",
        rules: {
            username: {
                required: true,
                minlength: 6,
            },
            password: {
                required: true,
                minlength: 6,
            },
           first_name: {
               required: true
           },
           last_name: {
               required: true
           },
           email: {
               required: true
           },
           mobileNumber: {
                number: true,
           },    
        //    practice_name: {
        //        required: true,
        //    }    
        }, messages : {
            username: {
                required: "Username is required",
                minlength: "Username must be greater than 6 digit",
            },
            password: {
                required: "Password is required",
                minlength: "Password must be greater than 6 digit",
            },       
            first_name: {
                required: "First name is required",                
            },       
            last_name: {
                required: "Last name is required",                
            },       
            email: {
                required: "Email is required",
                email:"Invalid email",
            },
            practice_name: {
                required: 'Practice name is required'
            }          
        }
    });

    if(addClinicianForm.valid()){
        return true;
    } else {
        window.scrollTo(500, 500);
        return false;
    }
}

function contactUsFormCommonValidation(){
    const contactUsFormCommon = $('#contactUsFormCommon');
    contactUsFormCommon.validate({
        ignore: "",
        errorElement: "em",
        rules: {           
           full_name: {
               required: true
           },          
           email: {
               required: true,
               email: true,
           },            
           message: {
            required: true
        }      
        }, messages : {
            full_name: {
                required: "Full Name Is Required",
            },       
            email: {
                required: "Email is required",
                email:"Invalid email",
            },
           message: {
                required: "Message is required",
           }         
        }
    });

    if(contactUsFormCommon.valid()){
        return true;
    } else {
        return false;
    }
}