<?php
/*Controlador  
GitHub:Edinson1408
email: edinsoncarlosflorian@gmial.com
*/
require '../Modelo/DoctorM.php';

/*class CarreraC extends */

 class DoctorC extends DoctorM
{
    

    public function BuscarDoctor($POST){
        return $this->Doctor($POST);
    }

   


    

}

$Obje=new DoctorC();

switch ($_POST['Peticion']) {
    case 'BuscarDoctores':
        $vita=$Obje->BuscarDoctor($_POST);
        echo $vita;
        break;

    default:
        # code...
        break;
}

?>