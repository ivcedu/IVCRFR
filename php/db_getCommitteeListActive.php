<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Committee] WHERE Active = 1 ORDER BY Committee ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);