<?php
    require("config.php");

    $query = "SELECT comm.Committee, cmbr.ComName, cmbr.ComEmail, "
            . "CASE WHEN cmbr.ComChair = 1 THEN 'Yes' ELSE 'No' END AS Chair, "
            . "CASE WHEN cmbr.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''committee_mbr_id_' + CONVERT(NVARCHAR(255), cmbr.CommitteeMbrID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[CommitteeMbr] AS cmbr INNER JOIN [".$dbDatabase."].[dbo].[Committee] AS comm ON cmbr.CommitteeID = comm.CommitteeID AND cmbr.Active = 1 "
            . "ORDER BY comm.Committee, cmbr.ComName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);