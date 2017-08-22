<?php
    require("config.php");
    
    $ReviewPeriodID = filter_input(INPUT_POST, 'ReviewPeriodID');
    $Active = filter_input(INPUT_POST, 'Active');
    $ReviewPeriod = filter_input(INPUT_POST, 'ReviewPeriod');
    $RPStartDate = filter_input(INPUT_POST, 'RPStartDate');
    $RPEndDate = filter_input(INPUT_POST, 'RPEndDate');
    
    $ReviewPeriod = str_replace("'", "''", $ReviewPeriod);

    $query = "UPDATE [".$dbDatabase."].[dbo].[ReviewPeriod] "
                ."SET Active = '".$Active."', ReviewPeriod = '".$ReviewPeriod."', RPStartDate = '".$RPStartDate."', RPEndDate = '".$RPEndDate."', Modified = getdate() "
                ."WHERE ReviewPeriodID = '".$ReviewPeriodID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);