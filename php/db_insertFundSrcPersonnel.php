<?php
    require("config.php");
    
    $PersonnelTypeID = filter_input(INPUT_POST, 'PersonnelTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[FundSrcPersonnel] (PersonnelTypeID, FundingSrcID) "
                ."VALUES ('$PersonnelTypeID', '$FundingSrcID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);