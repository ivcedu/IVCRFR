<?php
    require("config.php");
    
    $PersonnelTypeID = filter_input(INPUT_POST, 'PersonnelTypeID');
    $Active = filter_input(INPUT_POST, 'Active');
    $PersonnelType = filter_input(INPUT_POST, 'PersonnelType');
    
    $PersonnelType = str_replace("'", "''", $PersonnelType);

    $query = "UPDATE [".$dbDatabase."].[dbo].[PersonnelType] "
                ."SET Active = '".$Active."', PersonnelType = '".$PersonnelType."', Modified = getdate() "
                ."WHERE PersonnelTypeID = '".$PersonnelTypeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);