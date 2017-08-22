<?php
    require("config.php");
    
    $RFMinAmt = filter_input(INPUT_POST, 'RFMinAmt');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[RFMinAmt] (RFMinAmt) "
                ."VALUES ('$RFMinAmt')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);