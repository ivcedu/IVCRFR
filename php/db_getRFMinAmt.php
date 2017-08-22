<?php
    require("config.php");

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[RFMinAmt]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);