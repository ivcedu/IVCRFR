<?php
    require("config.php");
    
    $AprVPPID = filter_input(INPUT_POST, 'AprVPPID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprVPP] WHERE AprVPPID = '".$AprVPPID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);