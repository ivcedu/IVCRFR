var m_table;
var personnel_type_id = "";

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
            getPersonnelTypeListDataTable();
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
    
    // new personnel type button click /////////////////////////////////////////
    $('#btn_new_personnel_type').click(function() {
        personnel_type_id = "";
        clearModalSection();
        $('#mod_personnel_type_header').html("New Personnel Type Setting");
        $("#mod_personnel_type_active").iCheck('check');
        $('#mod_personnel_type_setting').modal('show');
        return false;
    });
    
    // personnel type edit button click ////////////////////////////////////////
    $('table').on('click', 'a[id^="personnel_type_id_"]', function() {
        personnel_type_id = $(this).attr('id').replace("personnel_type_id_", "");
        var result = new Array();
        result = db_getPersonnelTypeByID(personnel_type_id);
        
        clearModalSection();
        $('#mod_personnel_type_header').html("Edit Personnel Type Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_personnel_type_active").iCheck('check');
        }
        else {
            $("#mod_personnel_type_active").iCheck('unchecke');
        }
        $('#mod_personnel_type_name').val(result[0]['PersonnelType']);
        $('#mod_personnel_type_setting').modal('show');
        return false;
    });
    
    // modal personnel type save button click ///////////////////////////////////
    $('#mod_btn_personnel_type_save').click(function() {
        var personnel_type_active = ($('#mod_personnel_type_active').is(':checked') ? true : false);
        var personnel_type_name = $.trim($('#mod_personnel_type_name').val());
        
        if (personnel_type_id === "") {
            if (!personnelTypeValidation()) {
                return false;
            }
            else {                
                if (db_insertPersonnelType(personnel_type_name) === "") {
                    $('#mod_personnel_type_setting').modal('hide');
                    var str_msg = "DB system error INSERT PERSONNEL_TYPE";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updatePersonnelTypeByID(personnel_type_id, personnel_type_active, personnel_type_name)) {
                $('#mod_personnel_type_setting').modal('hide');
                var str_msg = "DB system error UPDATE PERSONNEL_TYPE - PersonnelTypeID: " + personnel_type_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getPersonnelTypeListDataTable();
        $('#mod_personnel_type_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_personnel_type_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
    
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
function personnelTypeValidation() {
    if ($.trim($('#mod_personnel_type_name').val()) === "") {
        swal({title: "Error", text: "Personnel Type is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getPersonnelTypeByPersonnelType($.trim($('#mod_personnel_type_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Personnel Type " + $('#mod_personnel_type_name').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPersonnelTypeListDataTable() {    
    var result = new Array();
    result = db_getPersonnelTypeListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_personnel_type_header').html("");
    $("#mod_personnel_type_active").iCheck('uncheck');
    $('#mod_personnel_type_name').val("");
}