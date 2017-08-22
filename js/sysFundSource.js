var m_table;
var fund_src_id = "";

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
            getFundingSrcListDataTable();
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
    
    // new funding src button click ////////////////////////////////////////////
    $('#btn_new_funding_src').click(function() {
        fund_src_id = "";
        clearModalSection();
        $('#mod_fund_src_header').html("New Funding Source Setting");
        $("#mod_fund_src_active").iCheck('check');
        $('#mod_fund_src_setting').modal('show');
        return false;
    });
    
    // funding src list edit button click //////////////////////////////////////
    $('table').on('click', 'a[id^="funding_src_id_"]', function() {
        fund_src_id = $(this).attr('id').replace("funding_src_id_", "");
        var result = new Array();
        result = db_getFundingSrcByID(fund_src_id);
        
        clearModalSection();
        $('#mod_fund_src_header').html("Edit Funding Src Setting");
        $('#mod_fund_src_type').val(result[0]['FSType']);
        if (result[0]['Active'] === "1") {
            $("#mod_fund_src_active").iCheck('check');
        }
        else {
            $("#mod_fund_src_active").iCheck('unchecke');
        }
        $('#mod_fund_src_mgr').val(result[0]['FSAdmin']);
        $('#mod_fund_src_email').val(result[0]['FSEmail']);
        $('#mod_fund_src_descrip').val(result[0]['FSDescription']);
        $('#mod_fund_src_setting').modal('show');
        
        return false;
    });
    
    // modal textarea resize
    $('#mod_fund_src_setting').on('shown.bs.modal', function() {
        $('#mod_fund_src_descrip').trigger('autosize.resize');
    });
    
    // modal funding src save button click /////////////////////////////////////
    $('#mod_btn_fund_src_save').click(function() {
        var fs_active = ($('#mod_fund_src_active').is(':checked') ? true : false);
        var fs_type = $.trim($('#mod_fund_src_type').val());
        var fs_admin = $.trim($('#mod_fund_src_mgr').val());
        var fs_email = $.trim($('#mod_fund_src_email').val());
        var fs_descrip = $.trim($('#mod_fund_src_descrip').val());
        
        if (fund_src_id === "") {
            if (!fundingSrcValidation()) {
                return false;
            }
            else {
                if (db_insertFundingSrc(fs_type, fs_admin, fs_email, fs_descrip) === "") {
                    $('#mod_fund_src_setting').modal('hide');
                    var str_msg = "DB system error INSERT FUNDING_SRC";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (db_updateFundingSrcByID(fund_src_id, fs_active, fs_type, fs_admin, fs_email, fs_descrip)) {
                $('#mod_fund_src_setting').modal('hide');
                var str_msg = "DB system error UPDATE FUNDING_SRC - FundingSrcID: " + fund_src_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getFundingSrcListDataTable();
        $('#mod_fund_src_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_fund_src_list').DataTable({ paging: false, bInfo: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 5 }],
                                                    dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                                                    "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                                                    buttons: [  {extend: 'copy', className: 'btn-sm'},
                                                                {extend: 'csv', title: 'export_csv', className: 'btn-sm'},
                                                                {extend: 'pdf', title: 'export_pdf', className: 'btn-sm'},
                                                                {extend: 'print', className: 'btn-sm'}
                                                            ] });

    // auto size
    $('#mod_fund_src_descrip').autosize();
    
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
function fundingSrcValidation() {
    if ($.trim($('#mod_fund_src_type').val()) === "") {
        swal({title: "Error", text: "Funding type is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_fund_src_mgr').val()) === "") {
        swal({title: "Error", text: "Funding manager name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_fund_src_email').val()) === "") {
        swal({title: "Error", text: "Funding manager email is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_fund_src_descrip').val()) === "") {
        swal({title: "Error", text: "Funding source description is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getFundingSrcByFSType($.trim($('#mod_fund_src_type').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Funding type " + $('#mod_fund_src_type').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getFundingSrcListDataTable() {    
    var result = new Array();
    result = db_getFundingSrcListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_fund_src_header').html("");
    $('#mod_fund_src_type').val("");
    $("#mod_fund_src_active").iCheck('uncheck');
    $('#mod_fund_src_mgr').val("");
    $('#mod_fund_src_email').val("");
    $('#mod_fund_src_descrip').val("");
}