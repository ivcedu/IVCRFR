<?php
    require("config.php");
    
    $CommitteeID = filter_input(INPUT_POST, 'CommitteeID');
    $Active = filter_input(INPUT_POST, 'Active');
    $Committee = filter_input(INPUT_POST, 'Committee');
    
    $Committee = str_replace("'", "''", $Committee);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Committee] "
                ."SET Active = '".$Active."', Committee = '".$Committee."', Modified = getdate() "
                ."WHERE CommitteeID = '".$CommitteeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);