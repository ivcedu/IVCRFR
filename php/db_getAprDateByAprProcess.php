<?php
    require("config.php");
    
    $AprProcess = filter_input(INPUT_POST, 'AprProcess');
    
    $AprProcess = str_replace("'", "''", $AprProcess);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprDate] WHERE AprProcess = '".$AprProcess."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);