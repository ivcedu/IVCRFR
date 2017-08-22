<?php
    require("config.php");
    
    $AssetType = filter_input(INPUT_POST, 'AssetType');
    
    $AssetType = str_replace("'", "''", $AssetType);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AssetType] WHERE AssetType = '".$AssetType."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);