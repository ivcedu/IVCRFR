var m_table;
var fund_src_asset_id = "";

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
            getAssetTypeListActive();
            getFundingSrcListActive();
            getFundSrcAssetListDataTable();
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
    
    // new asset funding button click //////////////////////////////////////////
    $('#btn_new_asset_funding').click(function() {
        fund_src_asset_id = "";
        clearModalSection();
        $('#mod_asset_funding_header').html("New Asset Funding Setting");
        $("#mod_asset_funding_active").iCheck('check');
        $('#mod_asset_funding_setting').modal('show');
        return false;
    });
    
    // asset funding list edit button click ////////////////////////////////////
    $('table').on('click', 'a[id^="fund_src_asset_id_"]', function() {
        fund_src_asset_id = $(this).attr('id').replace("fund_src_asset_id_", "");
        var result = new Array();
        result = db_getFundSrcAssetByID(fund_src_asset_id);
        
        clearModalSection();
        $('#mod_asset_funding_header').html("Edit Asset Funding Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_asset_funding_active").iCheck('check');
        }
        else {
            $("#mod_asset_funding_active").iCheck('unchecke');
        }
        $('#mod_asset_type_list').val(result[0]['AssetTypeID']);
        $('#mod_funding_src_list').val(result[0]['FundingSrcID']);
        $('#mod_asset_funding_setting').modal('show');
        return false;
    });
    
    // modal asset funding save button click ///////////////////////////////////
    $('#mod_btn_asset_funding_save').click(function() {  
        var fund_src_asset_active = ($('#mod_asset_funding_active').is(':checked') ? true : false);
        var asset_type_id = $('#mod_asset_type_list').val();
        var funding_src_id = $('#mod_funding_src_list').val();
        
        if (fund_src_asset_id === "") {
            if (!fundSrcAssetValidation()) {
                return false;
            }
            else {
                if (db_insertFundSrcAsset(asset_type_id, funding_src_id)  === "") {
                    $('#mod_asset_funding_setting').modal('hide');
                    var str_msg = "DB system error INSERT FUND_SRC_ASSET";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateFundSrcAssetByID(fund_src_asset_id, fund_src_asset_active, asset_type_id, funding_src_id)) {
                $('#mod_asset_funding_setting').modal('hide');
                var str_msg = "DB system error UPDATE FUND_SRC_ASSET - FundSrcAssetID: " + fund_src_asset_id;
                return dbSystemErrorHandling(str_msg);
            }
        }
        
        getFundSrcAssetListDataTable();
        $('#mod_asset_funding_setting').modal('hide');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////    
    m_table = $('#tbl_asset_funding_list').DataTable({ paging: false, bInfo: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }],
                                                        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                                                        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                                                        buttons: [  {extend: 'copy',className: 'btn-sm'},
                                                                    {extend: 'csv',title: 'export_csv', className: 'btn-sm'},
                                                                    {extend: 'pdf', title: 'export_pdf', className: 'btn-sm'},
                                                                    {extend: 'print',className: 'btn-sm'}
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
function fundSrcAssetValidation() {
    if ($('#mod_asset_type_list').val() === "0") {
        swal({title: "Error", text: "Asset Type is a required field", type: "error"});
        return false;
    }
    else if ($('#mod_funding_src_list').val() === "0") {
        swal({title: "Error", text: "Funding Source is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getFundSrcAssetByTypeSrc($('#mod_asset_type_list').val(), $('#mod_funding_src_list').val());
        if (result.length === 1) {
            swal({title: "Error", text: "Selected Asset Type and Funding Source already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAssetTypeListActive() {
    var result = new Array();
    result = db_getAssetTypeListActive();
    
    $('#mod_asset_type_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['AssetTypeID']  + "'>" + result[i]['AssetType'] + "</option>";
    }
    
    $('#mod_asset_type_list').append(html);
}

function getFundingSrcListActive() {
    var result = new Array();
    result = db_getFundingSrcListActive();
    
    $('#mod_funding_src_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['FundingSrcID']  + "'>" + result[i]['FSType'] + "</option>";
    }
    
    $('#mod_funding_src_list').append(html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getFundSrcAssetListDataTable() {    
    var result = new Array();
    result = db_getFundSrcAssetListDataTable();
    
    m_table.clear();
    m_table.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_asset_funding_header').html("");
    $("#mod_asset_funding_active").iCheck('uncheck');
    $('#mod_asset_type_list').val("0");
    $('#mod_funding_src_list').val("0");
}