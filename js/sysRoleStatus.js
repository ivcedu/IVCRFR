var m_table;
var status_id = "";

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
            getStatusListDataTable();
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
    
    // new status button click /////////////////////////////////////////////////
    $('#btn_new_status').click(function() {
        status_id = "";
        clearModalSection();
        $('#mod_status_header').html("New Status Setting");
        $("#mod_status_active").iCheck('check');
        $('#mod_status_setting').modal('show');
        return false;
    });
    
    // admin list edit button click ////////////////////////////////////////////
    $('table').on('click', 'a[id^="status_id_"]', function() {
        status_id = $(this).attr('id').replace("status_id_", "");
        var result = new Array();
        result = db_getStatusByID(status_id);
        
        clearModalSection();
        $('#mod_status_header').html("Edit Status Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_status_active").iCheck('check');
        }
        else {
            $("#mod_status_active").iCheck('unchecke');
        }
        $('#mod_status_name').val(result[0]['Status']);
        $('#mod_status_setting').modal('show');
        return false;
    });
    
    // modal admin save button click ////////////////////////////////////////////
    $('#mod_btn_status_save').click(function() {
        var status_active = ($('#mod_status_active').is(':checked') ? true : false);
        var status_name = $.trim($('#mod_status_name').val());
        
        if (status_id === "") {
            if (!statusValidation()) {
                return false;
            }
            else {                
                if (db_insertStatus(status_name) === "") {
                    $('#mod_status_setting').modal('hide');
                    var str_msg = "DB system error INSERT STATUS";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateStatusByID(status_id, status_active, status_name)) {
                $('#mod_status_setting').modal('hide');
                var str_msg = "DB system error UPDATE STATUS - StatusID: " + status_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getStatusListDataTable();
        $('#mod_status_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_status_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
    
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
function statusValidation() {
    if ($.trim($('#mod_status_name').val()) === "") {
        swal({title: "Error", text: "Status name is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getStatusByStatus($.trim($('#mod_status_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Status " + $('#mod_status_name').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getStatusListDataTable() {    
    var result = new Array();
    result = db_getStatusListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_status_header').html("");
    $("#mod_status_active").iCheck('uncheck');
    $('#mod_status_name').val("");
}