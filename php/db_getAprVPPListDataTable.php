<?php
    require("config.php");

    $query = "SELECT AprVPPName, CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "AprVPPEmail, AprVPPTitle, AprVPPDivision, AprVPPDepartment, "
            . "'<a href=# id=''apr_vpp_id_' + CONVERT(NVARCHAR(255), AprVPPID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[AprVPP] "
            . "ORDER BY AprVPPName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);