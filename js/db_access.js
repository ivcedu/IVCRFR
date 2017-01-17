////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB //////////////////////////////////////////////////////////////////////
//function db_getAdminByEmail(AdminEmail) {
//    var result = new Array();
//    $.ajax({
//        type:"POST",
//        url:"php/db_getAdminByEmail.php",
//        data:{AdminEmail:AdminEmail},
//        async: false,  
//        success:function(data) {
//            result = JSON.parse(data);
//        }
//    });
//    return result;
//}

// insert DB ///////////////////////////////////////////////////////////////////
//function db_insertAdmin(AdminName, AdminEmail, FullAccess) {
//    var ResultID = "";
//    $.ajax({
//        type:"POST",
//        url:"php/db_insertAdmin.php",
//        data:{AdminName:AdminName, AdminEmail:AdminEmail, FullAccess:FullAccess},
//        async: false,  
//        success:function(data) {
//            ResultID = JSON.parse(data);
//        }
//    });
//    return ResultID;
//}

// update DB ///////////////////////////////////////////////////////////////////
//function db_updateAdmin(AdminID, AdminName, AdminEmail, FullAccess) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_updateAdmin.php",
//        data:{AdminID:AdminID, AdminName:AdminName, AdminEmail:AdminEmail, FullAccess:FullAccess},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}

// delete DB ///////////////////////////////////////////////////////////////////
//function db_deleteAdmin(AdminID) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_deleteAdmin.php",
//        data:{AdminID:AdminID},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}