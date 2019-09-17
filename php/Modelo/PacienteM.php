<?php 
/*Incluir las conexiones*/
require '../Config/Conexion.php';
class PacienteM extends Conexion
{
    function Paciente($POST)
    {
        $sql="SELECT CONCAT(NOMBRES, ' ', APELLIDOS) as NOMBREPACIENTE FROM `pacientes_tbl` WHERE DNI='".$POST['IdPaciente']."'";
        return  $this->SelectArray($sql);
    }
    
}

?>
