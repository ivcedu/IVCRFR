<?php
    require("config.php");
    
    $PlanningID = filter_input(INPUT_POST, 'PlanningID');
    $Active = filter_input(INPUT_POST, 'Active');
    $tracdatLink = filter_input(INPUT_POST, 'tracdatLink');
    $tracdatUnitTypeID = filter_input(INPUT_POST, 'tracdatUnitTypeID');
    $Planning = filter_input(INPUT_POST, 'Planning');
    
    $Planning = str_replace("'", "''", $Planning);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Planning] "
                ."SET Active = '".$Active."', tracdatLink = '".$tracdatLink."', tracdatUnitTypeID = '".$tracdatUnitTypeID."', Planning = '".$Planning."', Modified = getdate() "
                ."WHERE PlanningID = '".$PlanningID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);