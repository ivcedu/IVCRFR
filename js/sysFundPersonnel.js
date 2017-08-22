var m_table;
var fund_src_personnel_id = "";

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
            getPersonnelTypeListActive();
            getFundingSrcListActive();
            getFundSrcPersonnelListDataTable();
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
    
    // new personnel funding button click //////////////////////////////////////
    $('#btn_new_personnel_funding').click(function() {
        fund_src_personnel_id = "";
        clearModalSection();
        $('#mod_personnel_funding_header').html("New Personnel Funding Setting");
        $("#mod_personnel_funding_active").iCheck('check');
        $('#mod_personnel_funding_setting').modal('show');
        return false;
    });
    
    // personnel funding list edit button click ////////////////////////////////
    $('table').on('click', 'a[id^="fund_src_personnel_id_"]', function() {
        fund_src_personnel_id = $(this).attr('id').replace("fund_src_personnel_id_", "");
        var result = new Array();
        result = db_getFundSrcPersonnelByID(fund_src_personnel_id);
        
        clearModalSection();
        $('#mod_personnel_funding_header').html("Edit Personnel Funding Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_personnel_funding_active").iCheck('check');
        }
        else {
            $("#mod_personnel_funding_active").iCheck('unchecke');
        }
        $('#mod_personnel_type_list').val(result[0]['PersonnelTypeID']);
        $('#mod_funding_src_list').val(result[0]['FundingSrcID']);
        $('#mod_personnel_funding_setting').modal('show');
        return false;
    });
    
    // modal personnel funding save button click //////////////////////////////
    $('#mod_btn_personnel_funding_save').click(function() {  
        var fund_src_personnel_active = ($('#mod_personnel_funding_active').is(':checked') ? true : false);
        var personnel_type_id = $('#mod_personnel_type_list').val();
        var funding_src_id = $('#mod_funding_src_list').val();
        
        if (fund_src_personnel_id === "") {
            if (!fundSrcPersonnelValidation()) {
                return false;
            }
            else {
                if (db_insertFundSrcPersonnel(personnel_type_id, funding_src_id)  === "") {
                    $('#mod_personnel_funding_setting').modal('hide');
                    var str_msg = "DB system error INSERT FUND_SRC_PERSONNEL";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateFundSrcPersonnelByID(fund_src_personnel_id, fund_src_personnel_active, personnel_type_id, funding_src_id)) {
                $('#mod_personnel_funding_setting').modal('hide');
                var str_msg = "DB system error UPDATE FUND_SRC_PERSONNEL - FundSrcPersonnelID: " + fund_src_personnel_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getFundSrcPersonnelListDataTable();
        $('#mod_personnel_funding_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////    
    m_table = $('#tbl_personnel_funding_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }] });
    
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
function fundSrcPersonnelValidation() {
    if ($('#mod_personnel_type_list').val() === "0") {
        swal({title: "Error", text: "Personnel Type is a required field", type: "error"});
        return false;
    }
    else if ($('#mod_funding_src_list').val() === "0") {
        swal({title: "Error", text: "Funding Source is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getFundSrcPersonnelByTypeSrc($('#mod_personnel_type_list').val(), $('#mod_funding_src_list').val());
        if (result.length === 1) {
            swal({title: "Error", text: "Selected Personnel Type and Funding Source already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPersonnelTypeListActive() {
    var result = new Array();
    result = db_getPersonnelTypeListActive();
    
    $('#mod_personnel_type_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['PersonnelTypeID']  + "'>" + result[i]['PersonnelType'] + "</option>";
    }
    
    $('#mod_personnel_type_list').append(html);
}

function getFundingSrcListActive() {
    var result = new Array();
    result = db_getFundingSrcListActive();
    
    $('#mod_funding_src_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['FundingSrcID']  + "'>" + result[i]['FSType'] + "</option>";
    }
    
    $('#mod_funding_src_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getFundSrcPersonnelListDataTable() {    
    var result = new Array();
    result = db_getFundSrcPersonnelListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_personnel_funding_header').html("");
    $("#mod_personnel_funding_active").iCheck('uncheck');
    $('#mod_personnel_type_list').val("0");
    $('#mod_funding_src_list').val("0");
}