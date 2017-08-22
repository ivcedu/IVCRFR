var m_table_asset_type;
var m_table_asset_item;
var asset_type_id = "";
var asset_item_id = "";

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
            getAssetTypeListDataTable();
            getAssetItemListDataTable();
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
    
    // new asset type button click /////////////////////////////////////////////
    $('#btn_new_asset_type').click(function() {
        asset_type_id = "";
        clearModalAssetTypeSection();
        $('#mod_asset_type_header').html("New Asset Type Setting");
        $("#mod_asset_type_active").iCheck('check');
        $('#mod_asset_type_setting').modal('show');
        return false;
    });
    
    // new asset item button click /////////////////////////////////////////////
    $('#btn_new_asset_item').click(function() {
        asset_item_id = "";
        clearModalAssetItemSection();
        $('#mod_asset_item_header').html("New Asset Item Setting");
        $("#mod_asset_item_active").iCheck('check');
        getAssetTypeListActive();
        $('#mod_asset_item_setting').modal('show');
        return false;
    });
    
    // asset type list edit button click ///////////////////////////////////////
    $('table').on('click', 'a[id^="asset_type_id_"]', function() {
        asset_type_id = $(this).attr('id').replace("asset_type_id_", "");
        var result = new Array();
        result = db_getAssetTypeByID(asset_type_id);
        
        clearModalAssetTypeSection();
        $('#mod_asset_type_header').html("Edit Asset Type Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_asset_type_active").iCheck('check');
        }
        else {
            $("#mod_asset_type_active").iCheck('unchecke');
        }
        $('#mod_asset_type_name').val(result[0]['AssetType']);
        $('#mod_asset_type_setting').modal('show');
        return false;
    });
    
    // asset item list edit button click ///////////////////////////////////////
    $('table').on('click', 'a[id^="asset_item_id_"]', function() {
        asset_item_id = $(this).attr('id').replace("asset_item_id_", "");
        var result = new Array();
        result = db_getAssetItemByID(asset_item_id);
        
        clearModalAssetItemSection();
        $('#mod_asset_item_header').html("Edit Asset Item Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_asset_item_active").iCheck('check');
        }
        else {
            $("#mod_asset_item_active").iCheck('unchecke');
        }
        getAssetTypeListActive();
        $('#mod_asset_type_list').val(result[0]['AssetTypeID']);
        $('#mod_asset_item_name').val(result[0]['AssetItem']);
        $('#mod_asset_item_setting').modal('show');
        return false;
    });
    
    // modal asset type save button click //////////////////////////////////////
    $('#mod_btn_asset_type_save').click(function() {  
        var asset_type_active = ($('#mod_asset_type_active').is(':checked') ? true : false);
        var asset_type_name = $.trim($('#mod_asset_type_name').val());
        
        if (asset_type_id === "") {
            if (!assetTypeValidation()) {
                return false;
            }
            else {
                if (db_insertAssetType(asset_type_name) === "") {
                    $('#mod_asset_type_setting').modal('hide');
                    var str_msg = "DB system error INSERT ASSET_TYPE";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateAssetTypeByID(asset_type_id, asset_type_active, asset_type_name)) {
                $('#mod_asset_type_setting').modal('hide');
                var str_msg = "DB system error UPDATE ASSET_TYPE - AssetTypeID: " + asset_type_id;
                return dbSystemErrorHandling(str_msg);
            }
        }

        getAssetTypeListDataTable();
        $('#mod_asset_type_setting').modal('hide');

        return false;
    });
    
    // modal asset item save button click //////////////////////////////////////
    $('#mod_btn_asset_item_save').click(function() {  
        var asset_item_active = ($('#mod_asset_item_active').is(':checked') ? true : false);
        var asset_type_id = $('#mod_asset_type_list').val();
        var asset_item_name = $.trim($('#mod_asset_item_name').val());
        
        if (asset_item_id === "") {
            if (!assetItemValidation()) {
                return false;
            }
            else {
                if (db_insertAssetItem(asset_type_id, asset_item_name) === "") {
                    $('#mod_asset_item_setting').modal('hide');
                    var str_msg = "DB system error INSERT ASSET_ITEM";
                    return dbSystemErrorHandling(str_msg);
                }
            }
        }
        else {
            if (!db_updateAssetItemByID(asset_item_id, asset_item_active, asset_type_id, asset_item_name)) {
                $('#mod_asset_item_setting').modal('hide');
                var str_msg = "DB system error UPDATE ASSET_ITEM - AssetItemID: " + asset_item_id;
                return dbSystemErrorHandling(str_msg);
            }
        }

        getAssetItemListDataTable();
        $('#mod_asset_item_setting').modal('hide');

        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table_asset_type = $('#tbl_asset_type_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }] });
    m_table_asset_item = $('#tbl_asset_item_list').DataTable({ paging: false, bInfo: false, searching: false, columnDefs:[{ className: "dt-center", orderable: false, targets: 3 }] });
    
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
function assetTypeValidation() {
    if ($.trim($('#mod_asset_type_name').val()) === "") {
        swal({title: "Error", text: "Asset type is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getAssetTypeByType($.trim($('#mod_asset_type_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Asset type " + $('#mod_asset_type_name').val() + " already exist", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

function assetItemValidation() {
    if ($('#mod_asset_type_list').val() === "0") {
        swal({title: "Error", text: "Please select Asset Type", type: "error"});
        return false;
    }
    else if ($.trim($('#mod_asset_item_name').val()) === "") {
        swal({title: "Error", text: "Asset item is a required field", type: "error"});
        return false;
    }
    else {
        var result = new Array();
        result = db_getAssetItemByTypeIDItem($('#mod_asset_type_list').val(), $.trim($('#mod_asset_item_name').val()));
        if (result.length === 1) {
            swal({title: "Error", text: "Asset Item " + $('#mod_asset_item_name').val() + " already exist in selected Asset Type", type: "error"});
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAssetTypeListDataTable() {    
    var result = new Array();
    result = db_getAssetTypeListDataTable();
    
    m_table_asset_type.clear();
    m_table_asset_type.rows.add(result).draw();
}

function getAssetItemListDataTable() {    
    var result = new Array();
    result = db_getAssetItemListDataTable();
    
    m_table_asset_item.clear();
    m_table_asset_item.rows.add(result).draw();
}

////////////////////////////////////////////////////////////////////////////////
function clearModalAssetTypeSection() {
    $('#mod_asset_type_header').html("");
    $("#mod_asset_type_active").iCheck('uncheck');
    $('#mod_asset_type_name').val("");
}

function clearModalAssetItemSection() {
    $('#mod_asset_item_header').html("");
    $("#mod_asset_item_active").iCheck('uncheck');
    $('#mod_asset_type_list').val("0");
    $('#mod_asset_item_name').val("");
}