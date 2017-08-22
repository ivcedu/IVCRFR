<?php
    require("config.php");
    
    $AssetTypeID = filter_input(INPUT_POST, 'AssetTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[FundSrcAsset] WHERE AssetTypeID = '".$AssetTypeID."' AND FundingSrcID = '".$FundingSrcID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);