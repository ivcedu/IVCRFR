<?php
    require("config.php");
    
    $PlanningID = filter_input(INPUT_POST, 'PlanningID');
    $Objective = filter_input(INPUT_POST, 'Objective');
    
    $Objective = str_replace("'", "", $Objective);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Objective] WHERE PlanningID = '".$PlanningID."' AND Objective = '".$Objective."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);