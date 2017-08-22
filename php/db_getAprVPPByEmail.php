<?php
    require("config.php");
    
    $AprVPPEmail = filter_input(INPUT_POST, 'AprVPPEmail');
    
    $AprVPPEmail = str_replace("'", "", $AprVPPEmail);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprVPP] WHERE AprVPPEmail = '".$AprVPPEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);