<?php
    require("config.php");
    
    $AssetType = filter_input(INPUT_POST, 'AssetType');
    
    $AssetType = str_replace("'", "''", $AssetType);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AssetType] (AssetType) "
                ."VALUES ('$AssetType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);