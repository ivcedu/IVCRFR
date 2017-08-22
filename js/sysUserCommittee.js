var m_table;
var committee_mbr_id = "";

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
            getCommitteeMbrListDataTable();
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
        committee_mbr_id = "";
        clearModalSection();
        $('#mod_comm_mbr_header').html("New Committee Member Setting");
        $("#mod_comm_mbr_active").iCheck('check');
        getCommitteeListActive();
        $('#mod_comm_mbr_setting').modal('show');
        return false;
    });
    
    // committee member list edit button click /////////////////////////////////
    $('table').on('click', 'a[id^="committee_mbr_id_"]', function() {
        committee_mbr_id = $(this).attr('id').replace("committee_mbr_id_", "");
        var result = new Array();
        result = db_getCommitteeMbrByID(committee_mbr_id);
        
        clearModalSection();
        $('#mod_comm_mbr_header').html("Edit Committee Member Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_comm_mbr_active").iCheck('check');
        }
        else {
            $("#mod_comm_mbr_active").iCheck('unchecke');
        }
        getCommitteeListActive();
        $('#mod_committee_list').val(result[0]['CommitteeID']);
        if (result[0]['ComChair'] === "1") {
            $("#mod_comm_mbr_chair").iCheck('check');
        }
        else {
            $("#mod_comm_mbr_chair").iCheck('unchecke');
        }
        $('#mod_comm_mbr_name').val(result[0]['ComName']);
        $('#mod_comm_mbr_email').val(result[0]['ComEmail']);
        $('#mod_comm_mbr_setting').modal('show');
        return false;
    });
    
    // modal committee member save button click ////////////////////////////////
    $('#mod_btn_comm_mbr_save').click(function() {  
        var com_mbr_active = ($('#mod_comm_mbr_active').is(':checked') ? true : false);
        var com_mbr_committee_id = $('#mod_committee_list').val();
        var com_mbr_chair = ($('#mod_comm_mbr_chair').is(':checked') ? true : false);
        var com_mbr_name = $.trim($('#mod_comm_mbr_name').val());
        var com_mbr_email = $.trim($('#mod_comm_mbr_email').val());
        
        if (committee_mbr_id === "") {
            if (!comMbrValidation()) {
                return false;
            }
            else {
                if (db_insertCommitteeMbr(com_mbr_committee_id, com_mbr_chair, com_mbr_name, com_mbr_email) === "") {
                    $('#mod_comm_mbr_setting').modal('hide');
                    var str_msg = "DB system error INSERT COMMITTEE_MBR";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateCommitteeMbrByID(committee_mbr_id, com_mbr_active, com_mbr_committee_id, com_mbr_chair, com_mbr_name, com_mbr_email)) {
                $('#mod_comm_mbr_setting').modal('hide');
                var str_msg = "DB system error UPDATE COMMITTEE_MBR - CommitteeMbrID: " + committee_mbr_id;
                return dbSystemErrorHandling(str_msg);
            }
        }

        getCommitteeMbrListDataTable();
        $('#mod_comm_mbr_setting').modal('hide');

        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_committee_mbr_list').DataTable({ paging: false, bInfo: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 5 }],
                                                       dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                                                       "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                                                       buttons: [  {extend: 'copy', className: 'btn-sm'},
                                                                   {extend: 'csv', title: 'export_csv', className: 'btn-sm'},
                                                                   {extend: 'pdf', title: 'export_pdf', className: 'btn-sm'},
                                                                   {extend: 'print', className: 'btn-sm'}
                                                                ] });
    
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
function comMbrValidation() {
    if ($('#mod_committee_list').val() === "0") {
        swal({title: "Error", text: "Please select Committee", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_comm_mbr_name').val()) === "") {
        swal({title: "Error", text: "Name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_comm_mbr_email').val()) === "") {
        swal({title: "Error", text: "Email is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getCommitteeMbrByCommitteeEmail($('#mod_committee_list').val(), $.trim($('#mod_comm_mbr_email').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Member " + $('#mod_comm_mbr_email').val() + " already exist in selected Committee", type: "error"});
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
function getCommitteeMbrListDataTable() {    
    var result = new Array();
    result = db_getCommitteeMbrListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_comm_mbr_header').html("");
    $("#mod_comm_mbr_active").iCheck('uncheck');
    $('#mod_committee_list').val("0");
    $("#mod_comm_mbr_chair").iCheck('uncheck');
    $('#mod_comm_mbr_name').val("");
    $('#mod_comm_mbr_email').val("");
}