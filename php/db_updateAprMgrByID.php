<?php
    require("config.php");
    
    $AprMgrID = filter_input(INPUT_POST, 'AprMgrID');
    $Active = filter_input(INPUT_POST, 'Active');
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

    $query = "UPDATE [".$dbDatabase."].[dbo].[AprMgr] "
                . "SET Active = '".$Active."', AprMgrName = '".$AprMgrName."', AprMgrEmail = '".$AprMgrEmail."', AprMgrTitle = '".$AprMgrTitle."', "
                . "AprMgrDivision = '".$AprMgrDivision."', AprMgrDepartment = '".$AprMgrDepartment."', Modified = getdate() "
                . "WHERE AprMgrID = '".$AprMgrID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);