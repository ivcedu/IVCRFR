var rf_min_amt_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        if (!isLoginAdmin()) {
            swal({  title: "Access Denied",
                    text: "Access Denied",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('login.html', '_self');
                        return false;
                    }
            );
        }
        else {
            getLoginInfo();
            getRFMinAmt();
        }
    }
    else {
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // update asset min amount button click ////////////////////////////////////
    $('#btn_update_rf_min_amt').click(function() {
        var rf_min_amt_active = ($('#rf_min_amt_active').is(':checked') ? true : false);
        if (!db_updateRFMinAmtByID(rf_min_amt_id, rf_min_amt_active, revertDollar($('#rf_min_amt').val()))) {
            var str_msg = "DB system error UPDATE RF_MIN_AMT - RFMinAmtID: " + rf_min_amt_id;
            return dbSystemErrorHandling(str_msg);
        }

        getRFMinAmt();
        $(this).blur();
        return false;
    });
    
    // iCheck initialize
    $('input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%' // optional
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isLoginAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_rfr_loginEmail'));
    
    if (result.length === 0) {
        return false;
    }
    else {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_rfr_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRFMinAmt() {
    var result = new Array();
    result = db_getRFMinAmt();
    rf_min_amt_id = result[0]['RFMinAmtID'];
    if (result[0]['Active'] === "1") {
        $("#rf_min_amt_active").iCheck('check');
    }
    else {
        $("#rf_min_amt_active").iCheck('unchecke');
    }
    $('#rf_min_amt').val(formatDollar(Number(result[0]['RFMinAmt']), 2));
}