<?php
    require("config.php");
    
    $RFMinAmtID = filter_input(INPUT_POST, 'RFMinAmtID');
    $Active = filter_input(INPUT_POST, 'Active');
    $RFMinAmt = filter_input(INPUT_POST, 'RFMinAmt');

    $query = "UPDATE [".$dbDatabase."].[dbo].[RFMinAmt] "
                ."SET Active = '".$Active."', RFMinAmt = '".$RFMinAmt."', Modified = getdate() "
                ."WHERE RFMinAmtID = '".$RFMinAmtID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);