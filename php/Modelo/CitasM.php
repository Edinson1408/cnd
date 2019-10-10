<?php 
/*Incluir las conexiones*/
session_start();
require '../Config/Conexion.php';
class CitasM extends Conexion
{
    function RegistrarCita($POST)
    {
        $rr=date("Y/m/d H:i:s");
        $sql="";
        /*
        INSERT INTO `citas_tbl`(`IDCITA`, `IDTOMOGRAFO`, `FECHACITA`, `HORACITA`, `FECHAHORA`, `DNI_PACIENTE`, 
        `NOMBRE_PACIENTE`, `TELEFONO_PACIENTE`, `CELULAR_PACIENTE`, `IDEXAMEN`, `NOMBRE_EXAMEN`, `PRECIO_EXAMEN`, 
        `MEDICO_ENVIA`, `HOSPITAL`, `OBSERVACIONES`, `DATE_CREATE`, `USER_CREATE`, `DATE_UPDATE`, `USER_UPDATE`) 
        VALUES ([value-1],[value-2],[value-3],[value-4],
        [value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13],[value-14],
        [value-15],[value-16],[value-17],[value-18],[value-19])
        */ 
        //IdDoctor
        $Usuario=$_SESSION['USUARIO'];
        $Sql=" INSERT INTO `citas_tbl`(`IDTOMOGRAFO`, `FECHACITA`, `HORACITA`, `HORAFIN`, `DNI_PACIENTE`, 
        `NOMBRE_PACIENTE`, `TELEFONO_PACIENTE`, `CELULAR_PACIENTE`, `IDEXAMEN`, `PRECIO_EXAMEN`, 
        `MEDICO_ENVIA`, `HOSPITAL`, `OBSERVACIONES`, `DATE_CREATE`, `USER_CREATE`,`COLOR`,`Titulo`,`EDAD`,`PRECIO2`,`ID_VISITADOR`) value 
        ('1','".$POST['txtFecha']."','".$POST['txtHora']."','".$POST['txtHoraFin']."','".$POST['txtDNIPaciente']."',
        '".$POST['txtNombrePaciente']."','".$POST['txtFijo']."','".$POST['txtCelular']."','".$POST['txtCodExamen']."','".$POST['txtPrecioExamen']."',
        '".$POST['txtNombreDoctor']."','".$POST['txtHospital']."','".$POST['txtObservaciones']."',
        sysdate(),'".$Usuario."','#FFFFFF','".$POST['txtTitulo']."','".$POST['txtEdad']."','".$POST['txtPrecioExamen2']."','".$POST['txtVisitador']."');
        ";
        $this->Query($Sql);
        echo  mysqli_insert_id($this->Conexion);
    }

    function RegistrarCita2($POST)
    {
        $rr=date("Y/m/d H:i:s");
        $sql="";
        /*
        INSERT INTO `citas_tbl`(`IDCITA`, `IDTOMOGRAFO`, `FECHACITA`, `HORACITA`, `FECHAHORA`, `DNI_PACIENTE`, 
        `NOMBRE_PACIENTE`, `TELEFONO_PACIENTE`, `CELULAR_PACIENTE`, `IDEXAMEN`, `NOMBRE_EXAMEN`, `PRECIO_EXAMEN`, 
        `MEDICO_ENVIA`, `HOSPITAL`, `OBSERVACIONES`, `DATE_CREATE`, `USER_CREATE`, `DATE_UPDATE`, `USER_UPDATE`) 
        VALUES ([value-1],[value-2],[value-3],[value-4],
        [value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13],[value-14],
        [value-15],[value-16],[value-17],[value-18],[value-19])
        */ 
        //IdDoctor
        $Usuario=$_SESSION['USUARIO'];
        $Sql=" INSERT INTO `citas_tbl`(`IDTOMOGRAFO`, `FECHACITA`, `HORACITA`, `HORAFIN`, `DNI_PACIENTE`, 
        `NOMBRE_PACIENTE`, `TELEFONO_PACIENTE`, `CELULAR_PACIENTE`, `IDEXAMEN`, `PRECIO_EXAMEN`, 
        `MEDICO_ENVIA`, `HOSPITAL`, `OBSERVACIONES`, `DATE_CREATE`, `USER_CREATE`,`COLOR`,`Titulo`,`EDAD`,`PRECIO2`,`ID_VISITADOR`) value 
        ('2','".$POST['txtFecha']."','".$POST['txtHora']."','".$POST['txtHoraFin']."','".$POST['txtDNIPaciente']."',
        '".$POST['txtNombrePaciente']."','".$POST['txtFijo']."','".$POST['txtCelular']."','".$POST['txtCodExamen']."','".$POST['txtPrecioExamen']."',
        '".$POST['txtNombreDoctor']."','".$POST['txtHospital']."','".$POST['txtObservaciones']."',
        sysdate(),'".$Usuario."','#FFFFFF','".$POST['txtTitulo']."','".$POST['txtEdad']."','".$POST['txtPrecioExamen2']."','".$POST['txtVisitador']."');
        ";
        $this->Query($Sql);
        echo  mysqli_insert_id($this->Conexion);
    }

    public function consultarCurce ($POST){
         $SQL="SELECT IDTEMPORAL FROM `cita_temporal` WHERE FECHA='".$POST['Fecha']."'  AND HORA='".$POST['Hora']."' and IDTOMOGRAFO='".$POST['IdTomografo']."'";
         $Valida=$this->SelectArray($SQL);
         if ($Valida=='[]')
         {
            //si no presenta cruce , validamos la tabla de citas 
            $SQL2="SELECT IDCITA FROM `citas_tbl` WHERE FECHACITA='".$POST['Fecha']."'  AND HORACITA='".$POST['Hora']."' and IDTOMOGRAFO='".$POST['IdTomografo']."'";
            $Valida2=$this->SelectArray($SQL2);
                if ($Valida2=='[]')
                {
                    $SqlInsert="INSERT INTO cita_temporal (`FECHA`, `HORA`,`IDTOMOGRAFO`) VALUES ('".$POST['Fecha']."','".$POST['Hora']."','".$POST['IdTomografo']."')";
                    $this->Insert($SqlInsert);
                    return mysqli_insert_id($this->Conexion);
                }else {
                    return 'Con Cruce';
                }

         }
         else{
            return 'Con Cruce';
         }
    }
    
    public function DeleteTemporal($POST){
        
        $SqlElimina="DELETE FROM  cita_temporal where IDTEMPORAL='".$POST['IdTemporal']."' ";
        $this->Query($SqlElimina);

    }

    public function PrecioExamen($POST){
        $SQL="SELECT PRECIO FROM `examenes_tbl` where ID_EXAMEN='".$POST['IdExamen']."'";
         return $this->SelectArray($SQL);
    }

    public function VerCita($POST){
        $SQL="SELECT * FROM `citas_tbl` where IDCITA='".$POST['IdCita']."'";
        return $this->SelectArray($SQL);
    }

    public function VerTodasCitas($POST){
        $SQL="SELECT NOMBRE_PACIENTE as title ,
                CONCAT(FECHACITA,'T',HORACITA) AS start, CONCAT(FECHACITA,'T',HORAFIN) AS end,
                COLOR AS color,'#000000' AS textColor , IDCITA AS id 
                
        FROM `citas_tbl` where IDTOMOGRAFO='".$POST['IdTomografo']."'";
                                    
                                       

        return $this->SelectArray($SQL);
    }

    public function UpdateCita($POST){

        $Usuario=$_SESSION['USUARIO'];
        $Sql= "UPDATE  `citas_tbl` SET  
                        FECHACITA='".$POST['txtFecha']."',
                        HORACITA='".$POST['txtHora']."',
                        HORAFIN='".$POST['txtHoraFin']."',
                        DNI_PACIENTE='".$POST['txtDNIPaciente']."', 
                        NOMBRE_PACIENTE='".$POST['txtNombrePaciente']."',
                        TELEFONO_PACIENTE='".$POST['txtFijo']."',
                        CELULAR_PACIENTE='".$POST['txtCelular']."',
                        IDEXAMEN='".$POST['txtCodExamen']."',
                        PRECIO_EXAMEN='".$POST['txtPrecioExamen']."', 
                        MEDICO_ENVIA='".$POST['txtNombreDoctor']."', 
                        HOSPITAL='".$POST['txtHospital']."',
                        OBSERVACIONES='".$POST['txtObservaciones']."',
                        Titulo='".$POST['txtTitulo']."',
                        `EDAD`='".$POST['txtEdad']."',
                        PRECIO2='".$POST['txtPrecioExamen2']."',
                        DATE_UPDATE=sysdate(),
                        USER_UPDATE='".$Usuario."',
                        ID_VISITADOR='".$POST['txtVisitador']."'
                        WHERE IDCITA='".$POST['IdCita']."' ";
        $this->Query($Sql);
    }

    public function EliminaCita($POST){
        $Sql1="DELETE FROM citas_tbl WHERE IDCITA='".$POST['IdCita']."'";
        $Sql2="DELETE FROM cita_temporal WHERE FECHA='".$POST['Fecha']."' 
        AND IDTOMOGRAFO='".$POST['IdTomografo']."' AND HORA='".$POST['Hora']."' ";

        $this->Query($Sql1);
        $this->Query($Sql2);
    
    
    }
}

?>
