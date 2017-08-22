<?php
    require("config.php");

    $query = "SELECT Planning, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "CASE WHEN tracdatLink = 1 THEN 'TracDat v5' ELSE 'IVC' END AS Source, "
            . "'<a href=# id=''planning_id_' + CONVERT(NVARCHAR(255), PlanningID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Planning] "
            . "ORDER BY Planning ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);