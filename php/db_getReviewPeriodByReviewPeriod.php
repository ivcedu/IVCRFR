<?php
    require("config.php");
    
    $ReviewPeriod = filter_input(INPUT_POST, 'ReviewPeriod');
    
    $ReviewPeriod = str_replace("'", "''", $ReviewPeriod);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[ReviewPeriod] WHERE ReviewPeriod = '".$ReviewPeriod."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);