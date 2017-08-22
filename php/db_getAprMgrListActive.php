<?php
    require("config.php");

    $query = "SELECT * FROM [".$dbDatabase."].[dbo].[AprMgr] WHERE Active = 1 ORDER BY AprMgrName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);