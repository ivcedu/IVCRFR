////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get AD login info ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function getSearchUserInfo(php_file, user) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get DB //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_getAdminByID(AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByID.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminByEmail(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getUserByEmail(UserEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getUserByEmail.php",
        data:{UserEmail:UserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprMgrByID(AprMgrID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprMgrByID.php",
        data:{AprMgrID:AprMgrID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprMgrByEmail(AprMgrEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprMgrByEmail.php",
        data:{AprMgrEmail:AprMgrEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprMgrListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprMgrListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprMgrListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprMgrListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprVPPByID(AprVPPID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprVPPByID.php",
        data:{AprVPPID:AprVPPID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprVPPByEmail(AprVPPEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprVPPByEmail.php",
        data:{AprVPPEmail:AprVPPEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprVPPListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprVPPListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprVPPListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprVPPListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStudentByID(StudentID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentByID.php",
        data:{StudentID:StudentID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStudentByEmail(StuEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentByEmail.php",
        data:{StuEmail:StuEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStudentListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundingSrcByID(FundingSrcID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundingSrcByID.php",
        data:{FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundingSrcByFSType(FSType) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundingSrcByFSType.php",
        data:{FSType:FSType},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundingSrcListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundingSrcListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundingSrcListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundingSrcListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetTypeByID(AssetTypeID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetTypeByID.php",
        data:{AssetTypeID:AssetTypeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetTypeByType(AssetType) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetTypeByType.php",
        data:{AssetType:AssetType},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetTypeListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetTypeListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetTypeListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetTypeListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetItemByID(AssetItemID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetItemByID.php",
        data:{AssetItemID:AssetItemID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetItemByTypeIDItem(AssetTypeID, AssetItem) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetItemByTypeIDItem.php",
        data:{AssetTypeID:AssetTypeID, AssetItem:AssetItem},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAssetItemListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAssetItemListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprDateByID(AprDateID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprDateByID.php",
        data:{AprDateID:AprDateID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprDateByAprProcess(AprProcess) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprDateByAprProcess.php",
        data:{AprProcess:AprProcess},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAprDateListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAprDateListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusByID(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusByID.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusByStatus(Status) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusByStatus.php",
        data:{Status:Status},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStatusListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStatusListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodByID(ReviewPeriodID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodByID.php",
        data:{ReviewPeriodID:ReviewPeriodID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodByReviewPeriod(ReviewPeriod) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodByReviewPeriod.php",
        data:{ReviewPeriod:ReviewPeriod},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodBySearchDate(SearchDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodBySearchDate.php",
        data:{SearchDate:SearchDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReviewPeriodListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReviewPeriodListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPersonnelTypeByID(PersonnelTypeID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnelTypeByID.php",
        data:{PersonnelTypeID:PersonnelTypeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPersonnelTypeByPersonnelType(PersonnelType) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnelTypeByPersonnelType.php",
        data:{PersonnelType:PersonnelType},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPersonnelTypeListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnelTypeListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPersonnelTypeListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPersonnelTypeListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcAssetByID(FundSrcAssetID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcAssetByID.php",
        data:{FundSrcAssetID:FundSrcAssetID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcAssetByTypeSrc(AssetTypeID, FundingSrcID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcAssetByTypeSrc.php",
        data:{AssetTypeID:AssetTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcAssetListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcAssetListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcPersonnelByID(FundSrcPersonnelID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcPersonnelByID.php",
        data:{FundSrcPersonnelID:FundSrcPersonnelID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcPersonnelByTypeSrc(PersonnelTypeID, FundingSrcID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcPersonnelByTypeSrc.php",
        data:{PersonnelTypeID:PersonnelTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFundSrcPersonnelListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFundSrcPersonnelListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getRFMinAmt() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getRFMinAmt.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeByID(CommitteeID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeByID.php",
        data:{CommitteeID:CommitteeID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeByCommittee(Committee) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeByCommittee.php",
        data:{Committee:Committee},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeMbrByID(CommitteeMbrID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeMbrByID.php",
        data:{CommitteeMbrID:CommitteeMbrID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeMbrByCommitteeEmail(CommitteeID, ComEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeMbrByCommitteeEmail.php",
        data:{CommitteeID:CommitteeID, ComEmail:ComEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeMbrListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeMbrListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCommitteeMbrListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCommitteeMbrListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlanningByID(PlanningID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlanningByID.php",
        data:{PlanningID:PlanningID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlanningByPlanning(Planning) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlanningByPlanning.php",
        data:{Planning:Planning},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlanningListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlanningListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlanningListIVCActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlanningListIVCActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlanningListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlanningListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getObjectiveByID(ObjectiveID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getObjectiveByID.php",
        data:{ObjectiveID:ObjectiveID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getObjectiveByPlanningIDObjective(PlanningID, Objective) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getObjectiveByPlanningIDObjective.php",
        data:{PlanningID:PlanningID, Objective:Objective},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getObjectiveListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getObjectiveListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getObjectiveListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getObjectiveListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// insert DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_insertAdmin(Active, AdminName, AdminEmail, FullAccess) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{Active:Active, AdminName:AdminName, AdminEmail:AdminEmail, FullAccess:FullAccess},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertUser(UserName, UserEmail, UserTitle, UserDivision, UserDepartment, UserTypeID, AprMgrID, AprVPPID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertUser.php",
        data:{UserName:UserName, UserEmail:UserEmail, UserTitle:UserTitle, UserDivision:UserDivision, UserDepartment:UserDepartment, UserTypeID:UserTypeID, AprMgrID:AprMgrID, AprVPPID:AprVPPID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAprMgr(AprMgrName, AprMgrEmail, AprMgrTitle, AprMgrDivision, AprMgrDepartment) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAprMgr.php",
        data:{AprMgrName:AprMgrName, AprMgrEmail:AprMgrEmail, AprMgrTitle:AprMgrTitle, AprMgrDivision:AprMgrDivision, AprMgrDepartment:AprMgrDepartment},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAprVPP(AprVPPName, AprVPPEmail, AprVPPTitle, AprVPPDivision, AprVPPDepartment) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAprVPP.php",
        data:{AprVPPName:AprVPPName, AprVPPEmail:AprVPPEmail, AprVPPTitle:AprVPPTitle, AprVPPDivision:AprVPPDivision, AprVPPDepartment:AprVPPDepartment},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStudent(Active, StuName, StuEmail, AprMgrID, AprVPPID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStudent.php",
        data:{Active:Active, StuName:StuName, StuEmail:StuEmail, AprMgrID:AprMgrID, AprVPPID:AprVPPID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFundingSrc(FSType, FSAdmin, FSEmail, FSDescription) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFundingSrc.php",
        data:{FSType:FSType, FSAdmin:FSAdmin, FSEmail:FSEmail, FSDescription:FSDescription},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAssetType(AssetType) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAssetType.php",
        data:{AssetType:AssetType},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAssetItem(AssetTypeID, AssetItem) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAssetItem.php",
        data:{AssetTypeID:AssetTypeID, AssetItem:AssetItem},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAprDate(AprProcess, StartDate, EndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAprDate.php",
        data:{AprProcess:AprProcess, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStatus(Status) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStatus.php",
        data:{Status:Status},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertReviewPeriod(ReviewPeriod, RPStartDate, RPEndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertReviewPeriod.php",
        data:{ReviewPeriod:ReviewPeriod, RPStartDate:RPStartDate, RPEndDate:RPEndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPersonnelType(PersonnelType) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPersonnelType.php",
        data:{PersonnelType:PersonnelType},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFundSrcAsset(AssetTypeID, FundingSrcID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFundSrcAsset.php",
        data:{AssetTypeID:AssetTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFundSrcPersonnel(PersonnelTypeID, FundingSrcID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFundSrcPersonnel.php",
        data:{PersonnelTypeID:PersonnelTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertRFMinAmt(RFMinAmt) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertRFMinAmt.php",
        data:{RFMinAmt:RFMinAmt},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCommittee(Committee) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertCommittee.php",
        data:{Committee:Committee},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCommitteeMbr(CommitteeID, ComChair, ComName, ComEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertCommitteeMbr.php",
        data:{CommitteeID:CommitteeID, ComChair:ComChair, ComName:ComName, ComEmail:ComEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertPlanning(tracdatLink, tracdatUnitTypeID, Planning) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertPlanning.php",
        data:{tracdatLink:tracdatLink, tracdatUnitTypeID:tracdatUnitTypeID, Planning:Planning},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertObjective(PlanningID, Objective) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertObjective.php",
        data:{PlanningID:PlanningID, Objective:Objective},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_updateAdminByID(AdminID, Active, AdminName, AdminEmail, FullAccess) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdminByID.php",
        data:{AdminID:AdminID, Active:Active, AdminName:AdminName, AdminEmail:AdminEmail, FullAccess:FullAccess},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateUserByID(UserID, UserName, UserEmail, UserTitle, UserDivision, UserDepartment, UserTypeID, AprMgrID, AprVPPID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateUserByID.php",
        data:{UserID:UserID, UserName:UserName, UserEmail:UserEmail, UserTitle:UserTitle, UserDivision:UserDivision, UserDepartment:UserDepartment, UserTypeID:UserTypeID, AprMgrID:AprMgrID, AprVPPID:AprVPPID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAprMgrByID(AprMgrID, Active, AprMgrName, AprMgrEmail, AprMgrTitle, AprMgrDivision, AprMgrDepartment) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAprMgrByID.php",
        data:{AprMgrID:AprMgrID, Active:Active, AprMgrName:AprMgrName, AprMgrEmail:AprMgrEmail, AprMgrTitle:AprMgrTitle, AprMgrDivision:AprMgrDivision, AprMgrDepartment:AprMgrDepartment},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAprVPPByID(AprVPPID, Active, AprVPPName, AprVPPEmail, AprVPPTitle, AprVPPDivision, AprVPPDepartment) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAprVPPByID.php",
        data:{AprVPPID:AprVPPID, Active:Active, AprVPPName:AprVPPName, AprVPPEmail:AprVPPEmail, AprVPPTitle:AprVPPTitle, AprVPPDivision:AprVPPDivision, AprVPPDepartment:AprVPPDepartment},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStudentByID(StudentID, Active, StuName, StuEmail, AprMgrID, AprVPPID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStudentByID.php",
        data:{StudentID:StudentID, Active:Active, StuName:StuName, StuEmail:StuEmail, AprMgrID:AprMgrID, AprVPPID:AprVPPID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundingSrcByID(FundingSrcID, Active, FSType, FSAdmin, FSEmail, FSDescription) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundingSrcByID.php",
        data:{FundingSrcID:FundingSrcID, Active:Active, FSType:FSType, FSAdmin:FSAdmin, FSEmail:FSEmail, FSDescription:FSDescription},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAssetTypeByID(AssetTypeID, Active, AssetType) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAssetTypeByID.php",
        data:{AssetTypeID:AssetTypeID, Active:Active, AssetType:AssetType},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAssetItemByID(AssetItemID, Active, AssetTypeID, AssetItem) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAssetItemByID.php",
        data:{AssetItemID:AssetItemID, Active:Active, AssetTypeID:AssetTypeID, AssetItem:AssetItem},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAprDateByID(AprDateID, AprProcess, StartDate, EndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAprDateByID.php",
        data:{AprDateID:AprDateID, AprProcess:AprProcess, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStatusByID(StatusID, Active, Status) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStatusByID.php",
        data:{StatusID:StatusID, Active:Active, Status:Status},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateReviewPeriodByID(ReviewPeriodID, Active, ReviewPeriod, RPStartDate, RPEndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateReviewPeriodByID.php",
        data:{ReviewPeriodID:ReviewPeriodID, Active:Active, ReviewPeriod:ReviewPeriod, RPStartDate:RPStartDate, RPEndDate:RPEndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePersonnelTypeByID(PersonnelTypeID, Active, PersonnelType) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePersonnelTypeByID.php",
        data:{PersonnelTypeID:PersonnelTypeID, Active:Active, PersonnelType:PersonnelType},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundSrcAssetByID(FundSrcAssetID, Active, AssetTypeID, FundingSrcID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundSrcAssetByID.php",
        data:{FundSrcAssetID:FundSrcAssetID, Active:Active, AssetTypeID:AssetTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFundSrcPersonnelByID(FundSrcPersonnelID, Active, PersonnelTypeID, FundingSrcID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFundSrcPersonnelByID.php",
        data:{FundSrcPersonnelID:FundSrcPersonnelID, Active:Active, PersonnelTypeID:PersonnelTypeID, FundingSrcID:FundingSrcID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateRFMinAmtByID(RFMinAmtID, Active, RFMinAmt) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRFMinAmtByID.php",
        data:{RFMinAmtID:RFMinAmtID, Active:Active, RFMinAmt:RFMinAmt},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCommitteeByID(CommitteeID, Active, Committee) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCommitteeByID.php",
        data:{CommitteeID:CommitteeID, Active:Active, Committee:Committee},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCommitteeMbrByID(CommitteeMbrID, Active, CommitteeID, ComChair, ComName, ComEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCommitteeMbrByID.php",
        data:{CommitteeMbrID:CommitteeMbrID, Active:Active, CommitteeID:CommitteeID, ComChair:ComChair, ComName:ComName, ComEmail:ComEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updatePlanningByID(PlanningID, Active, tracdatLink, tracdatUnitTypeID, Planning) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updatePlanningByID.php",
        data:{PlanningID:PlanningID, Active:Active, tracdatLink:tracdatLink, tracdatUnitTypeID:tracdatUnitTypeID, Planning:Planning},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateObjectiveByID(ObjectiveID, Active, PlanningID, Objective) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateObjectiveByID.php",
        data:{ObjectiveID:ObjectiveID, Active:Active, PlanningID:PlanningID, Objective:Objective},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function db_deleteAdmin(AdminID) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_deleteAdmin.php",
//        data:{AdminID:AdminID},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get tracdatv5 DB ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function tracdatv5_getUnitTypeList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tracdatv5_getUnitTypeList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}