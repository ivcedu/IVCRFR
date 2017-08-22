<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[PersonnelType] WHERE Active = 1 ORDER BY PersonnelType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);