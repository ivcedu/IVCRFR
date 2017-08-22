<?php
    require("config.php");
    
    $FundSrcAssetID = filter_input(INPUT_POST, 'FundSrcAssetID');
    $Active = filter_input(INPUT_POST, 'Active');
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');

    $query = "UPDATE [".$dbDatabase."].[dbo].[FundSrcAsset] "
                . "SET Active = '".$Active."', AssetTypeID = '".$AssetTypeID."', FundingSrcID = '".$FundingSrcID."', Modified = getdate() "
                . "WHERE FundSrcAssetID = '".$FundSrcAssetID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);