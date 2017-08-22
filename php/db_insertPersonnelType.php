<?php
    require("config.php");
    
    $PersonnelType = filter_input(INPUT_POST, 'PersonnelType');
    
    $PersonnelType = str_replace("'", "''", $PersonnelType);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[PersonnelType] (PersonnelType) "
                ."VALUES ('$PersonnelType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);