<?php
    require("config.php");
    
    $Status = filter_input(INPUT_POST, 'Status');
    
    $Status = str_replace("'", "''", $Status);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Status] (Status) "
                ."VALUES ('$Status')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);