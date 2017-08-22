<?php
    require("config.php");
    
    $FundSrcPersonnelID = filter_input(INPUT_POST, 'FundSrcPersonnelID');
    $Active = filter_input(INPUT_POST, 'Active');
    $PersonnelTypeID = filter_input(INPUT_POST, 'PersonnelTypeID');
    $FundingSrcID = filter_input(INPUT_POST, 'FundingSrcID');

    $query = "UPDATE [".$dbDatabase."].[dbo].[FundSrcPersonnel] "
                . "SET Active = '".$Active."', PersonnelTypeID = '".$PersonnelTypeID."', FundingSrcID = '".$FundingSrcID."', Modified = getdate() "
                . "WHERE FundSrcPersonnelID = '".$FundSrcPersonnelID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);