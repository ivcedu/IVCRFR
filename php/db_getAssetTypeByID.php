<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AssetType] WHERE AssetTypeID = '".$AssetTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);