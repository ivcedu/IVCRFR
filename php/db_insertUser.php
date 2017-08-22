<?php
    require("config.php");
    
    $UserName = filter_input(INPUT_POST, 'UserName');
    $UserEmail = filter_input(INPUT_POST, 'UserEmail');
    $UserTitle = filter_input(INPUT_POST, 'UserTitle');
    $UserDivision = filter_input(INPUT_POST, 'UserDivision');
    $UserDepartment = filter_input(INPUT_POST, 'UserDepartment');
    $UserTypeID = filter_input(INPUT_POST, 'UserTypeID');
    $AprMgrID = filter_input(INPUT_POST, 'AprMgrID');
    $AprVPPID = filter_input(INPUT_POST, 'AprVPPID');
    
    $UserName = str_replace("'", "''", $UserName);
    $UserEmail = str_replace("'", "", $UserEmail);
    $UserTitle = str_replace("'", "''", $UserTitle);
    $UserDivision = str_replace("'", "''", $UserDivision);
    $UserDepartment = str_replace("'", "''", $UserDepartment);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[User] (UserName, UserEmail, UserTitle, UserDivision, UserDepartment, UserTypeID, AprMgrID, AprVPPID) "
                ."VALUES ('$UserName', '$UserEmail', '$UserTitle', '$UserDivision', '$UserDepartment', '$UserTypeID', '$AprMgrID', '$AprVPPID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);