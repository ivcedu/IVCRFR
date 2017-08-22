<?php
    require("config.php");

    $query = "SELECT FSType, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "FSAdmin, FSEmail, FSDescription, "
            . "'<a href=# id=''funding_src_id_' + CONVERT(NVARCHAR(255), FundingSrcID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[FundingSrc]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);