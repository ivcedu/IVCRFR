<?php
    require("config.php");
    
    $AprVPPName = filter_input(INPUT_POST, 'AprVPPName');
    $AprVPPEmail = filter_input(INPUT_POST, 'AprVPPEmail');
    $AprVPPTitle = filter_input(INPUT_POST, 'AprVPPTitle');
    $AprVPPDivision = filter_input(INPUT_POST, 'AprVPPDivision');
    $AprVPPDepartment = filter_input(INPUT_POST, 'AprVPPDepartment');
    
    $AprVPPName = str_replace("'", "''", $AprVPPName);
    $AprVPPEmail = str_replace("'", "", $AprVPPEmail);
    $AprVPPTitle = str_replace("'", "''", $AprVPPTitle);
    $AprVPPDivision = str_replace("'", "''", $AprVPPDivision);
    $AprVPPDepartment = str_replace("'", "''", $AprVPPDepartment);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AprVPP] (AprVPPName, AprVPPEmail, AprVPPTitle, AprVPPDivision, AprVPPDepartment) "
                ."VALUES ('$AprVPPName', '$AprVPPEmail', '$AprVPPTitle', '$AprVPPDivision', '$AprVPPDepartment')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);