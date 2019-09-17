<?php 
/*Incluir las conexiones*/
require '../Config/Conexion.php';
class ExamenM extends Conexion
{
    function Examen($POST)
    {
        $sql="SELECT NOMBRE_EXAMEN FROM `examenes_tbl` where ID_EXAMEN='".$POST['IdExamen']."'";
        
        return  $this->SelectArray($sql);
    }
    
}

?>
