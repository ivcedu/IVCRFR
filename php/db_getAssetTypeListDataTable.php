<?php
    require("config.php");

    $query = "SELECT AssetType, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''asset_type_id_' + CONVERT(NVARCHAR(255), AssetTypeID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[AssetType] ORDER BY AssetType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);