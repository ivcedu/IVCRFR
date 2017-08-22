<?php
    require("config.php");

    $query = "SELECT stu.StuName, CASE WHEN stu.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "stu.StuEmail, mgr.AprMgrName, vpp.AprVPPName, "
            . "'<a href=# id=''student_id_' + CONVERT(NVARCHAR(255), StudentID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[Student] AS stu INNER JOIN [".$dbDatabase."].[dbo].[AprMgr] AS mgr ON stu.AprMgrID = mgr.AprMgrID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[AprVPP] AS vpp ON stu.AprVPPID = vpp.AprVPPID "
            . "ORDER BY stu.StuName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);