Validador=($Valor,$Tabla,$Id)=>{
 let Valor=jQuery('#'+$Valor).val();
console.log(Valor);
console.log ($Tabla);
console.log($Id);
jQuery.ajax({
            url:`php/Utlis/Utlis.php`,
            method:'POST',
            data : {'Peticion':'ValidaDuplicados','Valor':Valor,'Tabla':$Tabla,'Id':$Id},
            success:(data)=>{
                Obj=JSON.parse(data);
                //console.log(Obj);
                ///console.log(Object.keys(Obj).length)
                //JSON.stringify(obj)=='{}'
                if(Obj =='[]'){
                    console.log('SI procede ');
                    jQuery('#'+$Valor).addClass("is-valid");
                    jQuery('#'+$Valor).removeClass("is-invalid");
                    
                }else {
                    console.log('No procede ')
                    jQuery('#'+$Valor).addClass("is-invalid");
                    jQuery('#'+$Valor).val('');
                    document.getElementById($Valor).focus();
                    alert('El Id esta siendo usado por otro registro');
                }
                
            }
        });



}

ArmarSelect=($valor,$Tabla,$Id,$Des,$I)=>{
    jQuery.ajax({
        url:`php/Utlis/Utlis.php`,
        method:'POST',
        data : {'Peticion':'ArmaSelect','Tabla':$Tabla,'Id':$Id,'Des':$Des},
        success:(data)=>{  
            //console.log(data);
            
            Objeto=JSON.parse(data);
            Objeto2=JSON.parse(Objeto);
            
            var res='';
            Object.keys(Objeto2).forEach(
                key =>{
                    console.log(key, Objeto2[key])
                    $HtmlTablas=`
                    <option value='${Objeto2[key][$Id]}'>${Objeto2[key][$Des]}</option>
                      `;
                     res = res.concat($HtmlTablas);
                }) 
                Respuesta=' <option value="0">Seleccione una opcion</option>' +res;
              jQuery('#'+$valor).html(Respuesta);
        }
    });

}

ArmarSelectCascada=($valor,$Tabla,$Id,$Des,$CampoW,$ValorW)=>{
    jQuery.ajax({
        url:`php/Utlis/Utlis.php`,
        method:'POST',
        data : {'Peticion':'ArmaSelectCascada','Tabla':$Tabla,'Id':$Id,'Des':$Des,'CampoW':$CampoW,'ValorW':$ValorW},
        success:(data)=>{  
            //console.log(data);
            
            Objeto=JSON.parse(data);
            Objeto2=JSON.parse(Objeto);
            
            var res='';
            Object.keys(Objeto2).forEach(
                key =>{
                    console.log(key, Objeto2[key])
                    $HtmlTablas=`
                    <option value='${Objeto2[key][$Id]}'>${Objeto2[key][$Des]}</option>
                      `;
                     res = res.concat($HtmlTablas);
                }) 
                Respuesta=' <option value="0" >Seleccione un Examen</option>' +res;
              jQuery('#'+$valor).html(Respuesta);
        }
    });

}



ValidaSession=()=>{
   jQuery.ajax({
               url:`php/Utlis/Utlis.php`,
               method:'POST',
               data : {'Peticion':'VerSessiones'},
               success:(data)=>{
                   //console.log(data);
                   $Usuario=data.trim();
                   if ($Usuario=='[]')
                   {
                    window.location.replace("index.html");
                   }else{
                            //console.log($Objeto)
                            
                            console.log($Usuario.indexOf('Notice</b>:  Undefined index: USUARIO'))
                            if ($Usuario.indexOf('Notice</b>:  Undefined index: USUARIO')>0) {
                                console.log('')
                                window.location.replace("index.html");
                                
                            }else{
                                if($Usuario==''){
                                    window.location.replace("index.html");
                                }
                                else {
                                    $Objeto=JSON.parse(data);        
                                    if ($Objeto[0]['ESTADO']=='A') {
                                        //TODO ESTA BIEN
                                        $NOMBREUSUARIO=$Objeto[0]['PRIMER_NOMBRE']+$Objeto[0]['SEGUNDO_NOMBRE']+$Objeto[0]['APELLIDOS'];
                                        jQuery('#NombreUsuario').html($NOMBREUSUARIO);
                                        //VALIDANDO SI ES ADMIN
                                        console.log($Objeto[0]['TIPO_USUARIO']);
                                        if ($Objeto[0]['TIPO_USUARIO']=='ADMIN') {
                                            
                                        }else{
                                            jQuery('#MenuReporte').html(' ')
                                        }
                                        //TIPO_USUARIO: "ADMIN"
                                        
                                        
                                        
                                            

                                    }else{
                                        window.location.replace("index.html");
                                    }
                                }
                                
                            }
                        }       
               }
           });
   
   
   
   }
   ValidaSession();
   


   //Fecha actual
   var ACtualidad = new Date();
var MesActual=ACtualidad.getMonth();
if(MesActual<10){MesActual='0'+MesActual}
var FechaActual=ACtualidad.getFullYear()+'-'+MesActual+'-'+ACtualidad.getDate();
console.log(FechaActual)


setInterval('ValidaSession()',600000);
