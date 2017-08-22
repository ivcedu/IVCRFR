<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $AssetItem = filter_input(INPUT_POST, 'AssetItem');
    
    $AssetItem = str_replace("'", "''", $AssetItem);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AssetItem] (AssetTypeID, AssetItem) "
                ."VALUES ('$AssetTypeID', '$AssetItem')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);