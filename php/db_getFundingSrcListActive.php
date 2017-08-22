<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[FundingSrc] WHERE Active = 1 ORDER BY FSType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);