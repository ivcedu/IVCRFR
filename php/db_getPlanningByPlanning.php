<?php
    require("config.php");
    
    $Planning = filter_input(INPUT_POST, 'Planning');
    
    $Planning = str_replace("'", "''", $Planning);

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Planning] WHERE Planning = '".$Planning."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);