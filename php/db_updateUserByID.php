<?php
    require("config.php");
    
    $UserID = filter_input(INPUT_POST, 'UserID');
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

    $query = "UPDATE [".$dbDatabase."].[dbo].[User] "
                . "SET UserName = '".$UserName."', UserEmail = '".$UserEmail."', UserTitle = '".$UserTitle."', "
                . "UserDivision = '".$UserDivision."', UserDepartment = '".$UserDepartment."', "
                . "UserTypeID = '".$UserTypeID."', AprMgrID = '".$AprMgrID."', AprVPPID = '".$AprVPPID."', Modified = getdate() "
                . "WHERE UserID = '".$UserID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);