var m_table;
var committee_id = "";

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
            getCommitteeListDataTable();
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
    
    // new committee button click //////////////////////////////////////////////
    $('#btn_new_committee').click(function() {
        committee_id = "";
        clearModalSection();
        $('#mod_committee_header').html("New Committee Setting");
        $("#mod_committee_active").iCheck('check');
        $('#mod_committee_setting').modal('show');
        return false;
    });
    
    // committee list edit button click ////////////////////////////////////////
    $('table').on('click', 'a[id^="committee_id_"]', function() {
        committee_id = $(this).attr('id').replace("committee_id_", "");
        var result = new Array();
        result = db_getCommitteeByID(committee_id);
        
        clearModalSection();
        $('#mod_committee_header').html("Edit Committee Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_committee_active").iCheck('check');
        }
        else {
            $("#mod_committee_active").iCheck('unchecke');
        }
        $('#mod_committee_name').val(result[0]['Committee']);
        $('#mod_committee_setting').modal('show');
        return false;
    });
    
    // modal committee save button click ////////////////////////////////////////
    $('#mod_btn_committee_save').click(function() {  
        var committee_active = ($('#mod_committee_active').is(':checked') ? true : false);
        var committee_name = $.trim($('#mod_committee_name').val());
        
        if (committee_id === "") {
            if (!committeeValidation()) {
                return false;
            }
            else {
                if (db_insertCommittee(committee_name) === "") {
                    $('#mod_committee_setting').modal('hide');
                    var str_msg = "DB system error INSERT COMMITTEE";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateCommitteeByID(committee_id, committee_active, committee_name)) {
                $('#mod_committee_setting').modal('hide');
                var str_msg = "DB system error UPDATE COMMITTEE - CommitteeID: " + committee_id;
                return dbSystemErrorHandling(str_msg);
            }
        }

        getCommitteeListDataTable();
        $('#mod_committee_setting').modal('hide');

        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_committee_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
    
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
function committeeValidation() {
    if ($.trim($('#mod_committee_name').val()) === "") {
        swal({title: "Error", text: "Committee is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getCommitteeByCommittee($.trim($('#mod_committee_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Committee " + $('#mod_committee_name').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCommitteeListActive() {
    var result = new Array();
    result = db_getCommitteeListActive();
    
    $('#mod_committee_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['CommitteeID']  + "'>" + result[i]['Committee'] + "</option>";
    }
    
    $('#mod_committee_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCommitteeListDataTable() {    
    var result = new Array();
    result = db_getCommitteeListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_committee_header').html("");
    $("#mod_committee_active").iCheck('uncheck');
    $('#mod_committee_name').val("");
}