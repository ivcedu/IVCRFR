<?php
    require("config.php");
    
    $PlanningID = filter_input(INPUT_POST, 'PlanningID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Planning] WHERE PlanningID = '".$PlanningID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);