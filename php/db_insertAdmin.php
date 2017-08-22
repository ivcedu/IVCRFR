<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    $FullAccess = filter_input(INPUT_POST, 'FullAccess');
    
    $AdminName = str_replace("'", "''", $AdminName);
    $AdminEmail = str_replace("'", "", $AdminEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Admin] (Active, AdminName, AdminEmail, FullAccess) "
                ."VALUES ('$Active', '$AdminName', '$AdminEmail', '$FullAccess')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);