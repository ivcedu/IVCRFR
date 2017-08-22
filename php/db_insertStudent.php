<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $StuName = filter_input(INPUT_POST, 'StuName');
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');
    $AprMgrID = filter_input(INPUT_POST, 'AprMgrID');
    $AprVPPID = filter_input(INPUT_POST, 'AprVPPID');
    
    $StuName = str_replace("'", "''", $StuName);
    $StuEmail = str_replace("'", "", $StuEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Student] (Active, StuName, StuEmail, AprMgrID, AprVPPID) "
                ."VALUES ('$Active', '$StuName', '$StuEmail', '$AprMgrID', '$AprVPPID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);