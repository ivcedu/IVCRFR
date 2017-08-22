<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[AssetType] WHERE Active = 1 ORDER BY AssetType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);