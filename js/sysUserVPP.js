var m_table;
var apr_vpp_id = "";

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
            getAprVPPListDataTable();
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
    
    // new vpp button click ////////////////////////////////////////////////////
    $('#btn_new_vpp').click(function() {
        apr_vpp_id = "";
        clearModalSection();
        $('#mod_vpp_header').html("New VP/P Setting");
        $("#mod_vpp_active").iCheck('check');
        writeModalSection();
        $('#mod_vpp_setting').modal('show');
        return false;
    });
    
    // vpp list edit button click ///////////////////////////////////////////////
    $('table').on('click', 'a[id^="apr_vpp_id_"]', function() {
        apr_vpp_id = $(this).attr('id').replace("apr_vpp_id_", "");
        var result = new Array();
        result = db_getAprVPPByID(apr_vpp_id);
        
        clearModalSection();
        $('#mod_vpp_header').html("Edit VP/P Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_vpp_active").iCheck('check');
        }
        else {
            $("#mod_vpp_active").iCheck('unchecke');
        }
        $('#mod_vpp_mame').val(result[0]['AprVPPName']);
        $('#mod_vpp_email').val(result[0]['AprVPPEmail']);
        $('#mod_vpp_title').val(result[0]['AprVPPTitle']);
        $('#mod_vpp_division').val(result[0]['AprVPPDivision']);
        $('#mod_vpp_department').val(result[0]['AprVPPDepartment']);
        readonlyModalSection();
        $('#mod_vpp_setting').modal('show');
        return false;
    });
    
    // modal vpp save button click //////////////////////////////////////////////
    $('#mod_btn_vpp_save').click(function() {  
        var vpp_active = ($('#mod_vpp_active').is(':checked') ? true : false);
        var vpp_name = $.trim($('#mod_vpp_mame').val());
        var vpp_email = $.trim($('#mod_vpp_email').val());
        var vpp_title = $.trim($('#mod_vpp_title').val());
        var vpp_division = $.trim($('#mod_vpp_division').val());
        var vpp_department = $.trim($('#mod_vpp_department').val());
        
        if (apr_vpp_id === "") {
            if (!aprVPPValidation()) {
                return false;
            }
            else {
                if (db_insertAprVPP(vpp_name, vpp_email, vpp_title, vpp_division, vpp_department) === "") {
                    $('#mod_vpp_setting').modal('hide');
                    var str_msg = "DB system error INSERT APR_VPP";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateAprVPPByID(apr_vpp_id, vpp_active, vpp_name, vpp_email, vpp_title, vpp_division, vpp_department)) {
                $('#mod_vpp_setting').modal('hide');
                var str_msg = "DB system error UPDATE APR_VPP - AprVPPID: " + apr_vpp_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getAprVPPListDataTable();
        $('#mod_vpp_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_vpp_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 6 }] });
    
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
function aprVPPValidation() {
    if ($.trim($('#mod_vpp_mame').val()) === "") {
        swal({title: "Error", text: "VP/P name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_vpp_email').val()) === "") {
        swal({title: "Error", text: "VP/P email is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_vpp_title').val()) === "") {
        swal({title: "Error", text: "VP/P title is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_vpp_division').val()) === "") {
        swal({title: "Error", text: "VP/P division is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_vpp_department').val()) === "") {
        swal({title: "Error", text: "VP/P department is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getAprVPPByEmail($.trim($('#mod_vpp_email').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "VP/P " + $('#mod_vpp_email').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAprVPPListDataTable() {    
    var result = new Array();
    result = db_getAprVPPListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_vpp_header').html("");
    $("#mod_vpp_active").iCheck('uncheck');
    $('#mod_vpp_mame').val("");
    $('#mod_vpp_email').val("");
    $('#mod_vpp_title').val("");
    $('#mod_vpp_division').val("");
    $('#mod_vpp_department').val("");
}

function readonlyModalSection() {
    $('#mod_vpp_mame').attr("readonly", true);
    $('#mod_vpp_email').attr("readonly", true);
    $('#mod_vpp_title').attr("readonly", true);
    $('#mod_vpp_division').attr("readonly", true);
    $('#mod_vpp_department').attr("readonly", true);
}

function writeModalSection() {
    $('#mod_vpp_mame').attr("readonly", false);
    $('#mod_vpp_email').attr("readonly", false);
    $('#mod_vpp_title').attr("readonly", false);
    $('#mod_vpp_division').attr("readonly", false);
    $('#mod_vpp_department').attr("readonly", false);
}