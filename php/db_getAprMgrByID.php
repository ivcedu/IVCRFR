<?php
    require("config.php");
    
    $AprMgrID = filter_input(INPUT_POST, 'AprMgrID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprMgr] WHERE AprMgrID = '".$AprMgrID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);