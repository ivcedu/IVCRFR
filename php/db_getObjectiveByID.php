<?php
    require("config.php");
    
    $ObjectiveID = filter_input(INPUT_POST, 'ObjectiveID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Objective] WHERE ObjectiveID = '".$ObjectiveID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);