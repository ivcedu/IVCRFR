<?php
    require("config.php");

    $query = "SELECT prtp.PersonnelType, fdsr.FSType, CASE WHEN fspr.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''fund_src_personnel_id_' + CONVERT(NVARCHAR(255), fspr.FundSrcPersonnelID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[FundSrcPersonnel] AS fspr INNER JOIN [".$dbDatabase."].[dbo].[PersonnelType] AS prtp ON fspr.PersonnelTypeID = prtp.PersonnelTypeID "
            . "INNER JOIN [".$dbDatabase."].[dbo].[FundingSrc] AS fdsr ON fspr.FundingSrcID = fdsr.FundingSrcID "
            . "ORDER BY prtp.PersonnelType ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);