<?php 
/*Incluir las conexiones*/
require '../Config/Conexion.php';
class DoctorM extends Conexion
{
    function Doctor($POST)
    {
        $sql="SELECT concat(NOMBRES,' ',APELLIDOS) as NOMBREDOCTOR FROM doctores_tbl WHERE DNI='70895463'";
        //IdDoctor
        
        return  $this->SelectArray($sql);
    }
    
}

?>
