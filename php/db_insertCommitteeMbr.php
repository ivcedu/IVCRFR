<?php
    require("config.php");
    
    $CommitteeID = filter_input(INPUT_POST, 'CommitteeID');
    $ComChair = filter_input(INPUT_POST, 'ComChair');
    $ComName = filter_input(INPUT_POST, 'ComName');
    $ComEmail = filter_input(INPUT_POST, 'ComEmail');
    
    $ComName = str_replace("'", "''", $ComName);
    $ComEmail = str_replace("'", "", $ComEmail);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[CommitteeMbr] (CommitteeID, ComChair, ComName, ComEmail) "
                ."VALUES ('$CommitteeID', '$ComChair', '$ComName', '$ComEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);