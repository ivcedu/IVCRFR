<?php
    require("config.php");
    
    $FundSrcAssetID = filter_input(INPUT_POST, 'FundSrcAssetID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundSrcAsset] WHERE FundSrcAssetID = '".$FundSrcAssetID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);