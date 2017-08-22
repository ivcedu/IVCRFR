<?php
    require("config.php");

    $query = "SELECT ReviewPeriod, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "CONVERT(VARCHAR(10), RPStartDate, 101) AS RPStartDate, CONVERT(VARCHAR(10), RPEndDate, 101) AS RPEndDate, "
            . "'<a href=# id=''review_period_id_' + CONVERT(NVARCHAR(255), ReviewPeriodID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[ReviewPeriod] ORDER BY ReviewPeriod ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);