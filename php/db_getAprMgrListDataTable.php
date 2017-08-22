<?php
    require("config.php");

    $query = "SELECT AprMgrName, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "AprMgrEmail, AprMgrTitle, AprMgrDivision, AprMgrDepartment, "
            . "'<a href=# id=''apr_mgr_id_' + CONVERT(NVARCHAR(255), AprMgrID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[AprMgr] "
            . "ORDER BY AprMgrName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);