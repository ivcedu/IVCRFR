<?php
    require("config.php");
    
    $AssetItemID = filter_input(INPUT_POST, 'AssetItemID');
    $Active = filter_input(INPUT_POST, 'Active');
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $AssetItem = filter_input(INPUT_POST, 'AssetItem');
    
    $AssetItem = str_replace("'", "''", $AssetItem);

    $query = "UPDATE [".$dbDatabase."].[dbo].[AssetItem] "
                ."SET Active = '".$Active."', AssetTypeID = '".$AssetTypeID."', AssetItem = '".$AssetItem."', DTStamp = getdate() "
                ."WHERE AssetItemID = '".$AssetItemID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);