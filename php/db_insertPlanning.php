<?php
    require("config.php");
    
    $tracdatLink = filter_input(INPUT_POST, 'tracdatLink');
    $tracdatUnitTypeID = filter_input(INPUT_POST, 'tracdatUnitTypeID');
    $Planning = filter_input(INPUT_POST, 'Planning');
    
    $Planning = str_replace("'", "''", $Planning);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Planning] (tracdatLink, tracdatUnitTypeID, Planning) "
                ."VALUES ('$tracdatLink', '$tracdatUnitTypeID', '$Planning')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);