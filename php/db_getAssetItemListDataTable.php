<?php
    require("config.php");

    $query = "SELECT astp.AssetType, asit.AssetItem, CASE WHEN asit.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''asset_item_id_' + CONVERT(NVARCHAR(255), asit.AssetItemID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[AssetItem] AS asit INNER JOIN [".$dbDatabase."].[dbo].[AssetType] AS astp ON asit.AssetTypeID = astp.AssetTypeID AND astp.Active = 1 "
            . "ORDER BY astp.AssetType, asit.AssetItem ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);