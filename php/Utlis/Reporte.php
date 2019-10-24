<?php
require '../Config/Conexion.php';
$IdTomografo=$_GET['IdTomografo'];
header('Content-type: application/vnd.ms-excel;charset=iso-8859-15');
header('Content-Disposition: attachment; filename=Reporte_Citas_tomografo'.$IdTomografo.'.xls');
$rr=date("Y/m/d H:i:s");
//$Ruta=`php/Utlis/Reporte.php?IdTomografo=${{$IdTomografo}}&F1=${{$f1}}&F2=${{$f2}}`;

$f1=$_GET['F1'];
$f2=$_GET['F2'];


class Reporte extends Conexion
{
  public   function ReporteTomografos($IdTomografo,$f1,$f2)
    {
        $Sql="select a.*,b.NOMBRE_EXAMEN from citas_tbl a left JOIN examenes_tbl b on 
            a.IDEXAMEN=b.ID_EXAMEN where a.IDTOMOGRAFO='$IdTomografo' 
            and a.FECHACITA BETWEEN '$f1' AND '$f2';";
            $resul=mysqli_query($this->Conexion,$Sql);
            
            $concatener='';
            while ($row=mysqli_fetch_array($resul)) {
                   
                    $Cadena= " <tr>
                            <td>".$row['FECHACITA']."</td>
                            <td>".$row['HORACITA']."</td>
                            <td>".$row['HORAFIN']."</td>
                            <td>".$row['DNI_PACIENTE']."</td>
                            <td>".$row['NOMBRE_PACIENTE']."</td>
                            <td>".$row['EDAD']." </td>
                            <td>".$row['TELEFONO_PACIENTE']."</td>
                            <td>".$row['CELULAR_PACIENTE']."</td>
                            <td>".$row['NOMBRE_EXAMEN']."</td> 
                            <td>".$row['PRECIO_EXAMEN']."</td> 
                            <td>".$row['PRECIO2']."</td> 
                            <td>".$row['MEDICO_ENVIA']."</td> 
                            <td>".$row['HOSPITAL']."</td>        
                            <td>".$row['CONTRASTE']."</td>
                            <td>".$row['OBSERVACIONES']."</td> 
                            <td>".$row['USER_CREATE']."</td> 
                            <td>".$row['USER_UPDATE']."</td> 

                            
                            </tr>";
            $concatener=$concatener.$Cadena;
            }
            
            return $concatener;
     }

}
$oje= new Reporte();

$Tabla=$oje->ReporteTomografos($IdTomografo,$f1,$f2);
//echo $Tabla;
?>


<h1>Resonancia Salaverry</h1> 
<p>Fecha : <?=$rr?></p>
<table border="1" cellpadding="2" cellspacing="0" width="100%"> 
    <caption>Citas Programadas</caption> 
    <tr> 
        <td style="background-color: green;color:white;" rowspan="2">Fecha.</td> 
        <td style="background-color: green;color:white;" rowspan="2">Hora I.</td> 
        <td style="background-color: green;color:white;" rowspan="2">Hora F.</td> 
        <td colspan="5" style='text-align: center;'>Datos del Paciente</td>
        <td colspan="6" style='text-align: center;'>Datos de Procedimientos</td>
        <td rowspan="2">Observaciones</td> 
        <td colspan="2">Auditoria</td> 
    </tr>
    <tr> 
        <td >DNI</td>
        <td >NOMBRES Y APELLIDOS</td>
        <td >EDAD</td>
        <td >TELEFONO FIJO</td>
        <td >CELULAR</td>
        <td>EXAMEN</td> 
        <td>PRECIO</td> 
        <td>PRECIO FINAL</td> 
        <td>MEDICO</td> 
        <td>HOSPITAL</td>         
        <td>CONTRASTE</td>
        <td>USUARIO CREA</td>
        <td>USUARIO MODIFICA</td>
    </tr>
    <?=$Tabla?>
</table>

