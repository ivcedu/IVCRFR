var m_table;
var student_id = "";

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
            getAprMgrListActive();
            getAprVPPListActive();
            getStudentList();
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
    
    // new student button click ////////////////////////////////////////////////
    $('#btn_new_student').click(function() {
        student_id = "";
        clearModalSection();
        $('#mod_stu_header').html("New Student Setting");
        $("#mod_stu_active").iCheck('check');
        $('#mod_stu_setting').modal('show');
        return false;
    });
    
    // student list edit button click //////////////////////////////////////////
    $('table').on('click', 'a[id^="student_id_"]', function() {
        student_id = $(this).attr('id').replace("student_id_", "");
        var result = new Array();
        result = db_getStudentByID(student_id);
        
        clearModalSection();
        $('#mod_stu_header').html("Edit Student Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_stu_active").iCheck('check');
        }
        else {
            $("#mod_stu_active").iCheck('unchecke');
        }
        $('#mod_stu_mame').val(result[0]['StuName']);
        $('#mod_stu_email').val(result[0]['StuEmail']);
        $('#mod_mgr_list').val(result[0]['AprMgrID']);
        $('#mod_vpp_list').val(result[0]['AprVPPID']);
        $('#mod_stu_setting').modal('show');
        return false;
    });
    
    // modal student save button click //////////////////////////////////////////
    $('#mod_btn_stu_save').click(function() {  
        var stu_active = ($('#mod_stu_active').is(':checked') ? true : false);
        var stu_name = $.trim($('#mod_stu_mame').val());
        var stu_email = $.trim($('#mod_stu_email').val());
        var apr_mgr_id = $('#mod_mgr_list').val();
        var apr_vpp_id = $('#mod_vpp_list').val();
        
        if (student_id === "") {
            if (!studentValidation()) {
                return false;
            }
            else {
                if (db_insertStudent(stu_active, stu_name, stu_email, apr_mgr_id, apr_vpp_id) === "") {
                    $('#mod_stu_setting').modal('hide');
                    var str_msg = "DB system error INSERT STUDENT";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateStudentByID(student_id, stu_active, stu_name, stu_email, apr_mgr_id, apr_vpp_id)) {
                $('#mod_stu_setting').modal('hide');
                var str_msg = "DB system error UPDATE STUDENT - StudentID: " + student_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getStudentList();
        $('#mod_stu_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_stu_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 5 }] });
    
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
function studentValidation() {
    if ($.trim($('#mod_stu_mame').val()) === "") {
        swal({title: "Error", text: "Student name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_stu_email').val()) === "") {
        swal({title: "Error", text: "Student email is a required field", type: "error"});
        return false;
    }
    else if ($('#mod_mgr_list').val() === "0") {
        swal({title: "Error", text: "Please select Manager", type: "error"});
        return false;
    }
    else if ($('#mod_vpp_list').val() === "0") {
        swal({title: "Error", text: "Please select VP/P", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getStudentByEmail($.trim($('#mod_stu_email').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Student " + $('#mod_stu_email').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAprMgrListActive() {
    var result = new Array();
    result = db_getAprMgrListActive();
    
    $('#mod_mgr_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AprMgrID']  + "'>" + result[i]['AprMgrName'] + "</option>";
    }
    
    $('#mod_mgr_list').append(html);
}

function getAprVPPListActive() {
    var result = new Array();
    result = db_getAprVPPListActive();
    
    $('#mod_vpp_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AprVPPID']  + "'>" + result[i]['AprVPPName'] + "</option>";
    }
    
    $('#mod_vpp_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getStudentList() {    
    var result = new Array();
    result = db_getStudentListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_stu_header').html("");
    $("#mod_stu_active").iCheck('uncheck');
    $('#mod_stu_mame').val("");
    $('#mod_stu_email').val("");
    $('#mod_mgr_list').val("0");
    $('#mod_vpp_list').val("0");
}