var m_table_review_period;
var m_table_apr_date;
var review_period_id = "";
var apr_date_id = "";

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
            getReviewPeriodListDataTable();
            getAprDateListDataTable();
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
    
    // new review period button click //////////////////////////////////////////
    $('#btn_new_review_period').click(function() {
        review_period_id = "";
        clearModalSection();
        $('#mod_review_period_header').html("New Review Period Setting");
        $("#mod_review_period_active").iCheck('check');
        $('#mod_review_period_start').datepicker("setDate", "7/1/1900");
        $('#mod_review_period_end').datepicker("setDate", "7/1/1900");
        $('#mod_review_period_setting').modal('show');
        return false;
    });
    
    // new apr date button click ///////////////////////////////////////////////
    $('#btn_new_apr_date').click(function() {
        apr_date_id = "";
        clearModalSection();
        $('#mod_apr_date_header').html("New Committee Date Setting");
        $("#mod_apr_date_active").iCheck('check');
        $('#mod_apr_date_setting').modal('show');
        return false;
    });
    
    // review period list edit button click ////////////////////////////////////
    $('table').on('click', 'a[id^="review_period_id_"]', function() {
        review_period_id = $(this).attr('id').replace("review_period_id_", "");
        var result = new Array();
        result = db_getReviewPeriodByID(review_period_id);
        
        clearModalSection();
        $('#mod_review_period_header').html("Edit Review Period Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_review_period_active").iCheck('check');
        }
        else {
            $("#mod_review_period_active").iCheck('unchecke');
        }
        $('#mod_review_period_name').val(result[0]['ReviewPeriod']);
        $('#mod_review_period_start').val(convertDBDateToString(result[0]['RPStartDate']));
        $('#mod_review_period_end').val(convertDBDateToString(result[0]['RPEndDate']));
        $('#mod_review_period_setting').modal('show');
        return false;
    });
    
    // apr date list edit button click /////////////////////////////////////////
    $('table').on('click', 'a[id^="apr_date_id_"]', function() {
        apr_date_id = $(this).attr('id').replace("apr_date_id_", "");
        var result = new Array();
        result = db_getAprDateByID(apr_date_id);
        
        clearModalSection();
        $('#mod_apr_date_header').html("Edit Committee Date Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_apr_date_active").iCheck('check');
        }
        else {
            $("#mod_apr_date_active").iCheck('unchecke');
        }
        $('#mod_apr_date_approval').val(result[0]['AprProcess']);
        $('#mod_apr_date_start').val(convertDBDateToString(result[0]['StartDate']));
        $('#mod_apr_date_end').val(convertDBDateToString(result[0]['EndDate']));
        $('#mod_apr_date_setting').modal('show');
        return false;
    });
    
    // modal review period save button click ///////////////////////////////////
    $('#mod_btn_review_period_save').click(function() {
        var review_period_active = ($('#mod_review_period_active').is(':checked') ? true : false);
        var review_period_name = $.trim($('#mod_review_period_name').val());
        var review_period_start = $('#mod_review_period_start').val();
        var review_period_end = $('#mod_review_period_end').val();
        
        if (review_period_id === "") {
            if (!reviewPeriodValidation()) {
                return false;
            }
            else {                
                if (db_insertReviewPeriod(review_period_name, review_period_start, review_period_end) === "") {
                    $('#mod_review_period_setting').modal('hide');
                    var str_msg = "DB system error INSERT REVIEW_PERIOD";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateReviewPeriodByID(review_period_id, review_period_active, review_period_name, review_period_start, review_period_end)) {
                $('#mod_review_period_setting').modal('hide');
                var str_msg = "DB system error UPDATE REVIEW_PERIOD - ReviewPeriodID: " + review_period_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getReviewPeriodListDataTable();
        $('#mod_review_period_setting').modal('hide');
        return false;
    });
    
    // modal apr date save button click /////////////////////////////////////////
    $('#mod_btn_apr_date_save').click(function() {
        var apr_date_active = ($('#mod_apr_date_active').is(':checked') ? true : false);
        var apr_Process = $.trim($('#mod_apr_date_approval').val());
        var start_date = $.trim($('#mod_apr_date_start').val());
        var end_date = $.trim($('#mod_apr_date_end').val());
        
        if (apr_date_id === "") {
            if (!AprDateValidation()) {
                return false;
            }
            else {
                if (db_insertAprDate(apr_Process, start_date, end_date) === "") {
                    $('#mod_apr_date_setting').modal('hide');
                    var str_msg = "DB system error INSERT APR_DATE";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateAprDateByID(apr_date_id, apr_Process, start_date, end_date)) {
                $('#mod_apr_date_setting').modal('hide');
                var str_msg = "DB system error UPDATE APR_DATE - AprDateID: " + apr_date_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getAprDateListDataTable();
        $('#mod_apr_date_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table_review_period = $('#tbl_review_period_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
    m_table_apr_date = $('#tbl_apr_date_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }] });
    
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
function reviewPeriodValidation() {
    if ($.trim($('#mod_review_period_name').val()) === "") {
        swal({title: "Error", text: "Review Period name is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getReviewPeriodByReviewPeriod($.trim($('#mod_review_period_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Review Period " + $('#mod_review_period_name').val() + " already exist", type: "error"});
            return false;
        }
        result = db_getReviewPeriodBySearchDate($('#mod_review_period_start').val());
        if (result.length === 1) {
            swal({title: "Error", text: "Start Date " + $('#mod_review_period_start').val() + " already in previous Review Period date range", type: "error"});
            return false;
        }
        result = db_getReviewPeriodBySearchDate($('#mod_review_period_end').val());
        if (result.length === 1) {
            swal({title: "Error", text: "End Date " + $('#mod_review_period_end').val() + " already in previous Review Period date range", type: "error"});
            return false;
        }
        
        return true;
    }
}

function AprDateValidation() {
    if ($.trim($('#mod_apr_date_approval').val()) === "") {
        swal({title: "Error", text: "Approval Name is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_apr_date_start').val()) === "") {
        swal({title: "Error", text: "Start Date is a required field", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_apr_date_end').val()) === "") {
        swal({title: "Error", text: "End Date is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getAprDateByAprProcess($.trim($('#mod_apr_date_approval').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Approval Name " + $('#mod_apr_date_approval').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReviewPeriodListDataTable() {    
    var result = new Array();
    result = db_getReviewPeriodListDataTable();
    
    m_table_review_period.clear();
    m_table_review_period.rows.add(result).draw();
}

function getAprDateListDataTable() {    
    var result = new Array();
    result = db_getAprDateListDataTable();
    
    m_table_apr_date.clear();
    m_table_apr_date.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_review_period_header').html("");
    $("#mod_review_period_active").iCheck('uncheck');
    $('#mod_review_period_name').val("");
    $('#mod_review_period_start').val("");
    $('#mod_review_period_end').val("");
}

function clearModalSection() {
    $('#mod_apr_date_header').html("");
    $("#mod_apr_date_active").iCheck('uncheck');
    $('#mod_apr_date_approval').val("");
    $('#mod_apr_date_start').val("");
    $('#mod_apr_date_end').val("");
}