function setSession(key,data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getSession(key) {
    return JSON.parse(localStorage.getItem(key));
}

function checkAuth() {
    return getSession('userData')
}

function getUser() {
    let userData =  getSession('userData');
    if(!userData) {
        userData = {'first_name' : 'john', 'last_name' : 'doe', 'photo' : 'public/upload/general/user_404.jpg', 'email' : 'johnDoe@gmail.com', 'role' : 'unknown'}
    }

    return userData
}

function getMyImageName(first_name = '', last_name = '') {
    let fName = first_name;
    let lName = last_name;
    
    if(first_name == '' && last_name == ''){       
        let userData = getUser();
        fName = userData.first_name
        lName = userData.last_name       
    }

    const initials = fName.charAt(0) + lName.charAt(0);
    return initials.toUpperCase();
    // return 'PK';
}

function getAuthData() {
    let authData =  getSession('authData');
    if(!authData) {
        authData = {"dashboard":{"read":false,"write":false,"modify":false},"clinic":{"read":false,"write":false,"modify":false},"account":{"read":false,"write":false,"modify":false},"notes":{"read":false,"write":false,"modify":false}}
    }

    return authData
}

export {
    setSession,
    getSession,
    getUser,
    getAuthData,
    checkAuth,
    getMyImageName
}