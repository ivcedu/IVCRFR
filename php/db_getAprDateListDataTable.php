<?php
    require("config.php");

    $query = "SELECT AprProcess, "
            . "CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "CONVERT(VARCHAR(10), StartDate, 101) AS StartDate, CONVERT(VARCHAR(10), EndDate, 101) AS EndDate, "
            . "'<a href=# id=''apr_date_id_' + CONVERT(NVARCHAR(255), AprDateID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[AprDate] ORDER BY AprProcess ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);