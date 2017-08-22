<?php
    require("config.php");
    
    $CommitteeID = filter_input(INPUT_POST, 'CommitteeID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Committee] WHERE CommitteeID = '".$CommitteeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);