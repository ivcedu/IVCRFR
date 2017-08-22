<?php
    require("config.php");
    
    $AprMgrName = filter_input(INPUT_POST, 'AprMgrName');
    $AprMgrEmail = filter_input(INPUT_POST, 'AprMgrEmail');
    $AprMgrTitle = filter_input(INPUT_POST, 'AprMgrTitle');
    $AprMgrDivision = filter_input(INPUT_POST, 'AprMgrDivision');
    $AprMgrDepartment = filter_input(INPUT_POST, 'AprMgrDepartment');
    
    $AprMgrName = str_replace("'", "''", $AprMgrName);
    $AprMgrEmail = str_replace("'", "", $AprMgrEmail);
    $AprMgrTitle = str_replace("'", "''", $AprMgrTitle);
    $AprMgrDivision = str_replace("'", "''", $AprMgrDivision);
    $AprMgrDepartment = str_replace("'", "''", $AprMgrDepartment);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AprMgr] (AprMgrName, AprMgrEmail, AprMgrTitle, AprMgrDivision, AprMgrDepartment) "
                ."VALUES ('$AprMgrName', '$AprMgrEmail', '$AprMgrTitle', '$AprMgrDivision', '$AprMgrDepartment')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);