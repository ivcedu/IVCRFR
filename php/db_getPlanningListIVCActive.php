<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[Planning] WHERE Active = 1 AND tracdatLink = 0 ORDER BY Planning ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);