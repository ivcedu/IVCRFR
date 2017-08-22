<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[AprVPP] WHERE Active = 1 ORDER BY AprVPPName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);