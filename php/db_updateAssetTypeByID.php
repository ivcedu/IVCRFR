<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $Active = filter_input(INPUT_POST, 'Active');
    $AssetType = filter_input(INPUT_POST, 'AssetType');
    
    $AssetType = str_replace("'", "''", $AssetType);

    $query = "UPDATE [".$dbDatabase."].[dbo].[AssetType] "
                ."SET Active = '".$Active."', AssetType = '".$AssetType."', DTStamp = getdate() "
                ."WHERE AssetTypeID = '".$AssetTypeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);