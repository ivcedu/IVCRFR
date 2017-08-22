<?php
    require("config.php");
    
    $SearchDate = filter_input(INPUT_POST, 'SearchDate');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[ReviewPeriod] WHERE '".$SearchDate."' BETWEEN RPStartDate AND RPEndDate";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);