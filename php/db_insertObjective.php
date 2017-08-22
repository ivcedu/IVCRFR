<?php
    require("config.php");
    
    $PlanningID = filter_input(INPUT_POST, 'PlanningID');
    $Objective = filter_input(INPUT_POST, 'Objective');
    
    $Objective = str_replace("'", "''", $Objective);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Objective] (PlanningID, Objective) "
                ."VALUES ('$PlanningID', '$Objective')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);