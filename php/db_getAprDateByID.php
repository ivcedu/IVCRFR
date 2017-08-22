<?php
    require("config.php");
    
    $AprDateID = filter_input(INPUT_POST, 'AprDateID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprDate] WHERE AprDateID = '".$AprDateID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);