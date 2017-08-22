<?php
    require("config.php");

    $query = "SELECT Committee, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''committee_id_' + CONVERT(NVARCHAR(255), CommitteeID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Committee] ORDER BY Committee ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);