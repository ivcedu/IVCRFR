var m_table_planning;
var m_table_objective;
var planning_id = "";
var objective_id = "";

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
            getTracDatV5UnitTypeList();
            getPlanningListDataTable();
            getObjectiveListDataTable();
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
    
    // new planning button click ///////////////////////////////////////////////
    $('#btn_new_planning').click(function() {
        planning_id = "";
        clearModalPlanningSection();
        $('#mod_planning_header').html("New Planning Setting");
        $("#mod_planning_active").iCheck('check');
        $('#mod_planning_setting').modal('show');
        return false;
    });
    
    // modal planning use tracdat checkbox event change ////////////////////////
    $('#mod_tracdat_link').on('ifChanged', function(){
        if ($(this).is(':checked')) {
            $('.mod_planning_tracdat_section').show();
        }
        else {
            $('#mod_tracdat_unit_list').val("0");
            $('.mod_planning_tracdat_section').hide();
        }
    });
    
    // new objective button click ///////////////////////////////////////////////
    $('#btn_new_objective').click(function() {
        objective_id = "";
        clearModalObjectiveSection();
        $('#mod_objective_header').html("New Objective Setting");
        $("#mod_objective_active").iCheck('check');
        getPlanningListIVCActive();
        $('#mod_objective_setting').modal('show');
        return false;
    });

    // planning edit button click ///////////////////////////////////////////////
    $('table').on('click', 'a[id^="planning_id_"]', function() {
        planning_id = $(this).attr('id').replace("planning_id_", "");
        var result = new Array();
        result = db_getPlanningByID(planning_id);
        
        clearModalPlanningSection();
        $('#mod_planning_header').html("Edit Planning Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_planning_active").iCheck('check');
        }
        else {
            $("#mod_planning_active").iCheck('unchecke');
        }
        $('#mod_planning_name').val(result[0]['Planning']);
        if (result[0]['tracdatLink'] === "1") {
            $("#mod_tracdat_link").iCheck('check');
            $('#mod_tracdat_unit_list').val(result[0]['tracdatUnitTypeID']);
            $('.mod_planning_tracdat_section').show();
        }
        else {
            $("#mod_tracdat_link").iCheck('unchecke');
            $('.mod_planning_tracdat_section').hide();
        }
        $('#mod_planning_setting').modal('show');
        return false;
    });
    
    // objective edit button click ////////////////////////////////////////////////
    $('table').on('click', 'a[id^="objective_id_"]', function() {
        objective_id = $(this).attr('id').replace("objective_id_", "");
        var result = new Array();
        result = db_getObjectiveByID(objective_id);
        
        clearModalObjectiveSection();
        $('#mod_objective_header').html("Edit Objective Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_objective_active").iCheck('check');
        }
        else {
            $("#mod_objective_active").iCheck('unchecke');
        }
        getPlanningListIVCActive();
        $('#mod_planning_ivc_list').val(result[0]['PlanningID']);
        $('#mod_objective_name').val(result[0]['Objective']);
        $('#mod_objective_setting').modal('show');
        return false;
    });
    
    // modal planning save button click /////////////////////////////////////////
    $('#mod_btn_planning_save').click(function() {
        var planning_active = ($('#mod_planning_active').is(':checked') ? true : false);
        var planning_name = $.trim($('#mod_planning_name').val());
        var tracdat_link = ($('#mod_tracdat_link').is(':checked') ? true : false);
        var tracdat_unit_type_id = $('#mod_tracdat_unit_list').val();
        
        if (planning_id === "") {
            if (!planningValidation()) {
                return false;
            }
            else {                
                if (db_insertPlanning(tracdat_link, tracdat_unit_type_id, planning_name) === "") {
                    $('#mod_planning_setting').modal('hide');
                    var str_msg = "DB system error INSERT PLANNING";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updatePlanningByID(planning_id, planning_active, tracdat_link, tracdat_unit_type_id, planning_name)) {
                $('#mod_planning_setting').modal('hide');
                var str_msg = "DB system error UPDATE PLANNING - PlanningID: " + planning_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getPlanningListDataTable();
        $('#mod_planning_setting').modal('hide');
        return false;
    });
    
    // modal objective save button click //////////////////////////////////////////
    $('#mod_btn_objective_save').click(function() {
        var objective_active = ($('#mod_objective_active').is(':checked') ? true : false);
        var planning_id = $('#mod_planning_ivc_list').val();
        var objective_name = $.trim($('#mod_objective_name').val());
        
        if (objective_id === "") {
            if (!objectiveValidation()) {
                return false;
            }
            else {                
                if (db_insertObjective(planning_id, objective_name) === "") {
                    $('#mod_objective_setting').modal('hide');
                    var str_msg = "DB system error INSERT OBJECTIVE";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateObjectiveByID(objective_id, objective_active, planning_id, objective_name)) {
                $('#mod_objective_setting').modal('hide');
                var str_msg = "DB system error UPDATE OBJECTIVE - ObjectiveID: " + objective_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getObjectiveListDataTable();
        $('#mod_objective_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table_planning = $('#tbl_planning_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }] });
    m_table_objective = $('#tbl_objective_list').DataTable({ paging: false, bInfo: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }],
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
function planningValidation() {
    if ($.trim($('#mod_planning_name').val()) === "") {
        swal({title: "Error", text: "Planning is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getPlanningByPlanning($.trim($('#mod_planning_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Planning " + $('#mod_planning_name').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

function objectiveValidation() {
    if ($('#mod_planning_ivc_list').val() === "0") {
        swal({title: "Error", text: "Please select Planning", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_objective_name').val()) === "") {
        swal({title: "Error", text: "Objective is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getObjectiveByPlanningIDObjective($('#mod_planning_ivc_list').val(), $.trim($('#mod_objective_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Objective " + $('#mod_objective_name').val() + " already exist in selected Planning", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTracDatV5UnitTypeList() {
    var result = new Array();
    result = tracdatv5_getUnitTypeList();  
    
    $('#mod_tracdat_unit_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['unitTypeID']  + "'>" + result[i]['name'] + "</option>";
    }
    
    $('#mod_tracdat_unit_list').append(html);
}

function getPlanningListIVCActive() {
    var result = new Array();
    result = db_getPlanningListIVCActive();
    
    $('#mod_planning_ivc_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['PlanningID']  + "'>" + result[i]['Planning'] + "</option>";
    }
    
    $('#mod_planning_ivc_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPlanningListDataTable() {    
    var result = new Array();
    result = db_getPlanningListDataTable();
    
    m_table_planning.clear();
    m_table_planning.rows.add(result).draw();
}

function getObjectiveListDataTable() {
    var result = new Array();
    result = db_getObjectiveListDataTable();
    
    m_table_objective.clear();
    m_table_objective.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalPlanningSection() {
    $('#mod_planning_header').html("");
    $("#mod_planning_active").iCheck('uncheck');
    $('#mod_planning_name').val("");
    $("#mod_tracdat_link").iCheck('uncheck');
    $('#mod_tracdat_unit_list').val("0");
    $('.mod_planning_tracdat_section').hide();
}

function clearModalObjectiveSection() {
    $('#mod_objective_header').html("");
    $("#mod_objective_active").iCheck('uncheck');
    $('#mod_planning_ivc_list').val("0");
    $("#mod_objective_name").val("");
}