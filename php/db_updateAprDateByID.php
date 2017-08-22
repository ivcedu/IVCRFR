<?php
    require("config.php");
    
    $AprDateID = filter_input(INPUT_POST, 'AprDateID');
    $AprProcess = filter_input(INPUT_POST, 'AprProcess');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $AprProcess = str_replace("'", "''", $AprProcess);

    $query = "UPDATE [".$dbDatabase."].[dbo].[AprDate] "
                ."SET AprProcess = '".$AprProcess."', StartDate = '".$StartDate."', EndDate = '".$EndDate."', Modified = getdate() "
                ."WHERE AprDateID = '".$AprDateID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);