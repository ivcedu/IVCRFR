<?php
    require("config.php");
    
    $AprProcess = filter_input(INPUT_POST, 'AprProcess');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $AprProcess = str_replace("'", "''", $AprProcess);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[AprDate] (AprProcess, StartDate, EndDate) "
                ."VALUES ('$AprProcess', '$StartDate', '$EndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);