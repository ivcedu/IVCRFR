<?php
    require("config.php");
    
    $AprMgrEmail = filter_input(INPUT_POST, 'AprMgrEmail');
    
    $AprMgrEmail = str_replace("'", "", $AprMgrEmail);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[AprMgr] WHERE AprMgrEmail = '".$AprMgrEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);