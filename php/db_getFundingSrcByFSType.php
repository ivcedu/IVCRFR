<?php
    require("config.php");
    
    $FSType = filter_input(INPUT_POST, 'FSType');
    
    $FSType = str_replace("'", "''", $FSType);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundingSrc] WHERE FSType = '".$FSType."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);