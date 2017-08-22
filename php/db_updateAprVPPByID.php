<?php
    require("config.php");
    
    $AprVPPID = filter_input(INPUT_POST, 'AprVPPID');
    $Active = filter_input(INPUT_POST, 'Active');
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

    $query = "UPDATE [".$dbDatabase."].[dbo].[AprVPP] "
                . "SET Active = '".$Active."', AprVPPName = '".$AprVPPName."', AprVPPEmail = '".$AprVPPEmail."', AprVPPTitle = '".$AprVPPTitle."', "
                . "AprVPPDivision = '".$AprVPPDivision."', AprVPPDepartment = '".$AprVPPDepartment."', Modified = getdate() "
                . "WHERE AprVPPID = '".$AprVPPID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);