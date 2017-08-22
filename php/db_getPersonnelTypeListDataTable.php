<?php
    require("config.php");

    $query = "SELECT PersonnelType, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''personnel_type_id_' + CONVERT(NVARCHAR(255), PersonnelTypeID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[PersonnelType] ORDER BY PersonnelType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);