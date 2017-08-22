var m_table;
var apr_mgr_id = "";

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
            getAprMgrListDataTable();
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
    
    // new mgr button click ////////////////////////////////////////////////////
    $('#btn_new_mgr').click(function() {
        apr_mgr_id = "";
        clearModalSection();
        $('#mod_mgr_header').html("New Manager Setting");
        $("#mod_mgr_active").iCheck('check');
        writeModalSection();
        $('#mod_mgr_setting').modal('show');
        return false;
    });
    
    // mgr list edit button click //////////////////////////////////////////////
    $('table').on('click', 'a[id^="apr_mgr_id_"]', function() {
        apr_mgr_id = $(this).attr('id').replace("apr_mgr_id_", "");
        var result = new Array();
        result = db_getAprMgrByID(apr_mgr_id);
        
        clearModalSection();
        $('#mod_mgr_header').html("Edit Manager Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_mgr_active").iCheck('check');
        }
        else {
            $("#mod_mgr_active").iCheck('unchecke');
        }
        $('#mod_mgr_mame').val(result[0]['AprMgrName']);
        $('#mod_mgr_email').val(result[0]['AprMgrEmail']);
        $('#mod_mgr_title').val(result[0]['AprMgrTitle']);
        $('#mod_mgr_division').val(result[0]['AprMgrDivision']);
        $('#mod_mgr_department').val(result[0]['AprMgrDepartment']);
        readonlyModalSection();
        $('#mod_mgr_setting').modal('show');
        return false;
    });
    
    // modal mgr save button click ///////////////////////////////////////////////
    $('#mod_btn_mgr_save').click(function() {  
        var mgr_active = ($('#mod_mgr_active').is(':checked') ? true : false);
        var mgr_name = $.trim($('#mod_mgr_mame').val());
        var mgr_email = $.trim($('#mod_mgr_email').val());
        var mgr_title = $.trim($('#mod_mgr_title').val());
        var mgr_division = $.trim($('#mod_mgr_division').val());
        var mgr_department = $.trim($('#mod_mgr_department').val());
        
        if (apr_mgr_id === "") {
            if (!aprMgrValidation()) {
                return false;
            }
            else {
                if (db_insertAprMgr(mgr_name, mgr_email, mgr_title, mgr_division, mgr_department) === "") {
                    $('#mod_mgr_setting').modal('hide');
                    var str_msg = "DB system error INSERT APR_MGR";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateAprMgrByID(apr_mgr_id, mgr_active, mgr_name, mgr_email, mgr_title, mgr_division, mgr_department)) {
                $('#mod_mgr_setting').modal('hide');
                var str_msg = "DB system error UPDATE APR_MGR - AprMgrID: " + apr_mgr_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getAprMgrListDataTable();
        $('#mod_mgr_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_mgr_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 6 }] });
    
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
function aprMgrValidation() {
    if ($.trim($('#mod_mgr_mame').val()) === "") {
        swal({title: "Error", text: "Manager name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_mgr_email').val()) === "") {
        swal({title: "Error", text: "Manager email is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_mgr_title').val()) === "") {
        swal({title: "Error", text: "Manager title is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_mgr_division').val()) === "") {
        swal({title: "Error", text: "Manager division is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_mgr_department').val()) === "") {
        swal({title: "Error", text: "Manager department is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getAprMgrByEmail($.trim($('#mod_mgr_email').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Manager " + $('#mod_mgr_email').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAprMgrListDataTable() {    
    var result = new Array();
    result = db_getAprMgrListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_mgr_header').html("");
    $("#mod_mgr_active").iCheck('uncheck');
    $('#mod_mgr_mame').val("");
    $('#mod_mgr_email').val("");
    $('#mod_mgr_title').val("");
    $('#mod_mgr_division').val("");
    $('#mod_mgr_department').val("");
}

function readonlyModalSection() {
    $('#mod_mgr_mame').attr("readonly", true);
    $('#mod_mgr_email').attr("readonly", true);
    $('#mod_mgr_title').attr("readonly", true);
    $('#mod_mgr_division').attr("readonly", true);
    $('#mod_mgr_department').attr("readonly", true);
}

function writeModalSection() {
    $('#mod_mgr_mame').attr("readonly", false);
    $('#mod_mgr_email').attr("readonly", false);
    $('#mod_mgr_title').attr("readonly", false);
    $('#mod_mgr_division').attr("readonly", false);
    $('#mod_mgr_department').attr("readonly", false);
}