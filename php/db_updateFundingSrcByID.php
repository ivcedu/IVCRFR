<?php
    require("config.php");
    
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');
    $Active = filter_input(INPUT_POST, 'Active');
    $FSType = filter_input(INPUT_POST, 'FSType');
    $FSAdmin = filter_input(INPUT_POST, 'FSAdmin');
    $FSEmail = filter_input(INPUT_POST, 'FSEmail');
    $FSDescription = filter_input(INPUT_POST, 'FSDescription');
    
    $FSType = str_replace("'", "''", $FSType);
    $FSAdmin = str_replace("'", "''", $FSAdmin);
    $FSEmail = str_replace("'", "", $FSEmail);
    $FSDescription = str_replace("'", "''", $FSDescription);

    $query = "UPDATE [".$dbDatabase."].[dbo].[FundingSrc] "
                . "SET Active = '".$Active."', FSType = '".$FSType."', FSAdmin = '".$FSAdmin."', FSEmail = '".$FSEmail."', FSDescription = '".$FSDescription."', DTStamp = getdate() "
                . "WHERE FundingSrcID = '".$FundingSrcID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);