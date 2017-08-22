<?php
    require("config.php");
    
    $ObjectiveID = filter_input(INPUT_POST, 'ObjectiveID');
    $Active = filter_input(INPUT_POST, 'Active');
    $PlanningID = filter_input(INPUT_POST, 'PlanningID');
    $Objective = filter_input(INPUT_POST, 'Objective');
    
    $Objective = str_replace("'", "''", $Objective);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Objective] "
                ."SET Active = '".$Active."', PlanningID = '".$PlanningID."', Objective = '".$Objective."', Modified = getdate() "
                ."WHERE ObjectiveID = '".$ObjectiveID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);