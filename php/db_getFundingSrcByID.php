<?php
    require("config.php");
    
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundingSrc] WHERE FundingSrcID = '".$FundingSrcID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);