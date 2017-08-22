<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Objective] WHERE Active = 1 ORDER BY Objective ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);