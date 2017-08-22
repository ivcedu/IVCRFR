<?php
    require("config.php");
    
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[ReviewPeriod] WHERE ReviewPeriodID = '".$ReviewPeriodID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);