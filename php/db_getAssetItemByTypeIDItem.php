<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $AssetItem = filter_input(INPUT_POST, 'AssetItem');
    
    $AssetItem = str_replace("'", "''", $AssetItem);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AssetItem] WHERE AssetTypeID = '".$AssetTypeID."' AND AssetItem = '".$AssetItem."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);