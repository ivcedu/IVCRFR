<?php
    require("config_tracdatv5.php");

    $query = "SELECT * FROM [tracdatv5].[tracdat].[tUnitType] WHERE primaryType = 'A' ORDER BY name ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);