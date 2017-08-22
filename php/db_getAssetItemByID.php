<?php
    require("config.php");
    
    $AssetItemID = filter_input(INPUT_POST, 'AssetItemID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AssetItem] WHERE AssetItemID = '".$AssetItemID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);