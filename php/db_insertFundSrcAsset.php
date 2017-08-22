<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[FundSrcAsset] (AssetTypeID, FundingSrcID) "
                ."VALUES ('$AssetTypeID', '$FundingSrcID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);