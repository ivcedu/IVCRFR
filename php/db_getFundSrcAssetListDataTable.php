<?php
    require("config.php");

    $query = "SELECT astp.AssetType, fdsr.FSType, CASE WHEN fsat.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''fund_src_asset_id_' + CONVERT(NVARCHAR(255), fsat.FundSrcAssetID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[FundSrcAsset] AS fsat INNER JOIN [".$dbDatabase."].[dbo].[AssetType] AS astp ON fsat.AssetTypeID = astp.AssetTypeID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[FundingSrc] AS fdsr ON fsat.FundingSrcID = fdsr.FundingSrcID "
            . "ORDER BY astp.AssetType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);