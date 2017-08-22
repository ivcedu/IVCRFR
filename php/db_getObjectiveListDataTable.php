<?php
    require("config.php");

    $query = "SELECT pann.Planning, objv.Objective, CASE WHEN objv.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''objective_id_' + CONVERT(NVARCHAR(255), objv.ObjectiveID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Objective] AS objv INNER JOIN [".$dbDatabase."].[dbo].[Planning] AS pann ON objv.PlanningID = pann.PlanningID "
            . "ORDER BY pann.Planning, objv.Objective ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);