<?php
    require("config.php");
    
    $Committee = filter_input(INPUT_POST, 'Committee');
    
    $Committee = str_replace("'", "''", $Committee);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Committee] WHERE Committee = '".$Committee."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);