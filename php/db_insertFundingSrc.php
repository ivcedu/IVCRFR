<?php
    require("config.php");
    
    $FSType = filter_input(INPUT_POST, 'FSType');
    $FSAdmin = filter_input(INPUT_POST, 'FSAdmin');
    $FSEmail = filter_input(INPUT_POST, 'FSEmail');
    $FSDescription = filter_input(INPUT_POST, 'FSDescription');
    
    $FSType = str_replace("'", "''", $FSType);
    $FSAdmin = str_replace("'", "''", $FSAdmin);
    $FSEmail = str_replace("'", "", $FSEmail);
    $FSDescription = str_replace("'", "''", $FSDescription);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[FundingSrc] (FSType, FSAdmin, FSEmail, FSDescription) "
                ."VALUES ('$FSType', '$FSAdmin', '$FSEmail', '$FSDescription')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);