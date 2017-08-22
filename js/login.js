var m_user_id = "0";
var m_apr_mgr_id = "0";
var m_apr_vpp_id = "0";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        else {
            var login_error = loginInfo();
            if(login_error === "") {
                window.open('home.html', '_self');
            }
            else if (login_error === "Invalid Username or Password") {
                $('#error_msg').html(login_error);
                $('#logn_error').show();
                this.blur();
            }
            else if (login_error === "Access Denied") {
                swal({title: "Error", text: "You do not have access to Resource Request site", type: "error"});
            }
            else if (login_error === "No Division") {
                swal({title: "Error", text: "Your Division or Department has not been set up in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No Manager") {
                swal({title: "Error", text: "Your manager has not been set up in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No Mgr") {
                swal({title: "Error", text: "We cannot find your manager in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No Mgr Division") {
                swal({title: "Error", text: "Your manager Division or Department has not been set up in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No Mgr VPP") {
                swal({title: "Error", text: "We cannot find your manager's Vice President or President in our in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No VPP") {
                swal({title: "Error", text: "We cannot find Vice President or President in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            else if (login_error === "No VPP Division") {
                swal({title: "Error", text: "Your manager's Vice President or President Division or Department has not been set up in our Active Directory. Please contact 949.451.5596 for IVC Tech Support", type: "error"});
            }
            return false;
        }
    });
    
    $.backstretch(["images/ivcrfr_back_web_1.jpg"], {duration: 3000, fade: 750});
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    
    var result = new Array();
    result = getLoginUserInfo("php/ldap_login_staff.php", username, password);    
    if (result.length === 0) {
        result = getLoginUserInfo("php/ldap_login_student.php", username, password);
        if (result.length === 0) {
            return "Invalid Username or Password";
        }
        else {
            var stu_email = objToString(result[0]);
            result = db_getStudentByEmail(stu_email);
            if (result.length === 0) {
                return "Access Denied";
            }
            else {
                sessionData_login(result[0]["StuName"], stu_email, "", "", "");
                sessionStorage.setItem('ss_rfr_UserType', "Student");
                sessionStorage.setItem('ss_rfr_AprMgrID', result[0]["AprMgrID"]);
                sessionStorage.setItem('ss_rfr_AprVPPID', result[0]["AprVPPID"]);
                return dbSetUserInfo(result[0]["StuName"], stu_email, "", "", "", 2, result[0]["AprMgrID"], result[0]["AprVPPID"]);
            }
        }
    }
    else {
        var name = objToString(result[0]);
        var email = objToString(result[1]);
        var title = objToString(result[2]);
        var division = objToString(result[3]);
        var department = objToString(result[4]);
        var manager = objToString(result[5]);
        var etype = objToString(result[6]);
        
        // No division or department in AD
        if (division === "" || department === "") {
            return "No Division";
        }
        // No manager in AD
        if (manager === "" && $.trim(title) !== "President" && $.trim(title) !== "IT Test President") {
            return "No Manager";
        }
        
        sessionData_login(name, email, title, division, department);
        sessionStorage.setItem('ss_rfr_UserType', "Staff/Faculty");
        
        if (etype.indexOf("Faculty") !== -1) {
            var err = userManagerInfo(manager);
            if (err === "") {
                err = dbSetUserInfo(name, email, title, division, department, 1, m_apr_mgr_id, m_apr_vpp_id);
            }
            return err;
        }
        else {
            if ($.trim(title) === "President" || $.trim(title) === "IT Test President" || title.indexOf("Vice Pre") !== -1) {
                dbSetAprVPPInfo(name, email, title, division, department);
                m_apr_vpp_id = "0";
                sessionStorage.removeItem('ss_rfr_AprVPPID');
                return dbSetUserInfo(name, email, title, division, department, 1, m_apr_mgr_id, m_apr_vpp_id);
            }
            else if (title.indexOf("Dean") !== -1 || title.indexOf("Director") !== -1) {
                dbSetAprMgrInfo(name, email, title, division, department);
                m_apr_mgr_id = "0";
                sessionStorage.removeItem('ss_rfr_AprMgrID');
                var err = userVPPInfo(manager);
                if (err === "") {
                    err = dbSetUserInfo(name, email, title, division, department, 1, m_apr_mgr_id, m_apr_vpp_id);
                }
                return err;
            }
            else {
                var result = new Array();
                result = db_getAprMgrByEmail(email);
                if (result.length === 1) {
                    dbSetAprMgrInfo(name, email, title, division, department);
                    m_apr_mgr_id = "0";
                    sessionStorage.removeItem('ss_rfr_AprMgrID');
                    var err = userVPPInfo(manager);
                    if (err === "") {
                        err = dbSetUserInfo(name, email, title, division, department, 1, m_apr_mgr_id, m_apr_vpp_id);
                    }
                    return err;
                }
                else {
                    var err = userManagerInfo(manager);
                    if (err === "") {
                        err = dbSetUserInfo(name, email, title, division, department, 1, m_apr_mgr_id, m_apr_vpp_id);
                    }
                    return err;
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////
function userManagerInfo(manager) {
    var result = new Array();
    result = getSearchUserInfo("php/ldap_searchUser.php", manager);
    
    if (result.length === 0) {
        return "No Mgr";
    }
    else {
        var mgr_name = objToString(result[0]);
        var mgr_email = objToString(result[1]);
        var mgr_title = objToString(result[2]);
        var mgr_division = objToString(result[3]);
        var mgr_department = objToString(result[4]);
        var mgr_manager = objToString(result[5]);
        
        // No division or department in AD
        if (mgr_division === "" || mgr_department === "") {
            return "No Mgr Division";
        }
        // No manager in AD
        if (mgr_manager === "" && $.trim(mgr_title) !== "President") {
            return "No Mgr VPP";
        }

        // insert/update AprMgr table
        dbSetAprMgrInfo(mgr_name, mgr_email, mgr_title, mgr_division, mgr_department);
        return userVPPInfo(mgr_manager);
    }
}

function userVPPInfo(manager) {
    var result = new Array();
    result = getSearchUserInfo("php/ldap_searchUser.php", manager);
    
    if (result.length === 0) {
        return "No VPP";
    }
    else {
        var vpp_name = objToString(result[0]);
        var vpp_email = objToString(result[1]);
        var vpp_title = objToString(result[2]);
        var vpp_division = objToString(result[3]);
        var vpp_department = objToString(result[4]);

        // No division or department in AD
        if (vpp_division === "" || vpp_department === "") {
            return "No VPP Division";
        }

        // insert/update AprVPP table
        dbSetAprVPPInfo(vpp_name, vpp_email, vpp_title, vpp_division, vpp_department);
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function dbSetUserInfo(name, email, title, division, department, user_type_id, apr_mgr_id, apr_vpp_id) {    
    var result = new Array();
    result = db_getUserByEmail(email);
    
    if (result.length === 0) {
        m_user_id = db_insertUser(name, email, title, division, department, user_type_id, apr_mgr_id, apr_vpp_id);
        sessionStorage.setItem('ss_rfr_UserID', m_user_id);
    }
    else {
        m_user_id = result[0]["UserID"];
        db_updateUserByID(result[0]["UserID"], name, email, title, division, department, user_type_id, apr_mgr_id, apr_vpp_id);
        sessionStorage.setItem('ss_rfr_UserID', result[0]["UserID"]);
    }
    return "";
}

function dbSetAprMgrInfo(mgr_name, mgr_email, mgr_title, mgr_division, mgr_department) {    
    var result = new Array();
    result = db_getAprMgrByEmail(mgr_email);
    
    if (result.length === 0) {
        m_apr_mgr_id = db_insertAprMgr(mgr_name, mgr_email, mgr_title, mgr_division, mgr_department);
        sessionStorage.setItem('ss_rfr_AprMgrID', m_apr_mgr_id);
    }
    else {
        m_apr_mgr_id = result[0]["AprMgrID"];
        db_updateAprMgrByID(result[0]["AprMgrID"], true, mgr_name, mgr_email, mgr_title, mgr_division, mgr_department);
        sessionStorage.setItem('ss_rfr_AprMgrID', result[0]["AprMgrID"]);
    }
    return "";
}

function dbSetAprVPPInfo(vpp_name, vpp_email, vpp_title, vpp_division, vpp_department) {    
    var result = new Array();
    result = db_getAprVPPByEmail(vpp_email);
    
    if (result.length === 0) {
        m_apr_vpp_id = db_insertAprVPP(vpp_name, vpp_email, vpp_title, vpp_division, vpp_department);
        sessionStorage.setItem('ss_rfr_AprVPPID', m_apr_vpp_id);
    }
    else {
        m_apr_vpp_id = result[0]["AprVPPID"];
        db_updateAprVPPByID(result[0]["AprVPPID"], true, vpp_name, vpp_email, vpp_title, vpp_division, vpp_department);
        sessionStorage.setItem('ss_rfr_AprVPPID', result[0]["AprVPPID"]);
    }
    return "";
}