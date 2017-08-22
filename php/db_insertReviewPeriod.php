<?php
    require("config.php");
    
    $ReviewPeriod = filter_input(INPUT_POST, 'ReviewPeriod');
    $RPStartDate = filter_input(INPUT_POST, 'RPStartDate');
    $RPEndDate = filter_input(INPUT_POST, 'RPEndDate');
    
    $ReviewPeriod = str_replace("'", "''", $ReviewPeriod);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[ReviewPeriod] (ReviewPeriod, RPStartDate, RPEndDate) "
                ."VALUES ('$ReviewPeriod', '$RPStartDate', '$RPEndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);