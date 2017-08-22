<?php
    require("config.php");
    
    $Committee = filter_input(INPUT_POST, 'Committee');
    
    $Committee = str_replace("'", "''", $Committee);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Committee] (Committee) "
                ."VALUES ('$Committee')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);