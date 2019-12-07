  
        jQuery('#CrearNuevo').click(()=> {
            //Guardar Cita 
            /*INSERT INTO `citas_tbl`(`IDCITA`, `FECHACITA`, 
            `HORACITA`, `FECHAHORA`, `DNI_PACIENTE`, `NOMBRE_PACIENTE`, `TELEFONO_PACIENTE`, 
            `CELULAR_PACIENTE`, `IDEXAMEN`, `NOMBRE_EXAMEN`, `PRECIO_EXAMEN`, `MEDICO_ENVIA`, 
            `HOSPITAL`, `OBSERVACIONES`,`DATE_CREATE`, `USER_CREATE`, 
            `DATE_UPDATE`, `USER_UPDATE`) VALUES ([value-1],[value-2],
            [value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],
            [value-12],[value-13],[value-14],[value-15],[value-16],[value-17],[value-18])
            */
            var Conctraste;
            if(jQuery('#micheckbox').is(':checked'))
            {
                Conctraste='SI'
            }else{
                Conctraste='NO'
            }

            var Datos=jQuery('#FormularioEnnviar').serialize();
            Datos=Datos+'&Peticion=AgregarDoctor';

            
            Datos=Datos+'&CONTRASTE='+Conctraste;

            jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data :Datos,
                success: (data)=> {
                            //console.log(data);
                            jQuery('#largeModal').modal('hide');
                            
                            var NuevoEvento={
                                    title:jQuery('#txtNombrePaciente').val() +'\n'+'Doctor:'+jQuery('#txtNombreDoctor').val(),
                                    start:jQuery('#txtFecha').val()+"T"+jQuery('#txtHora').val(),
                                    end: jQuery('#txtFecha').val()+"T"+jQuery('#txtHoraFin').val(),
                                    color:'#FFFFFF',
                                    description:'asdasd',
                                    textColor:'#000000',
                                    id:data,
                                    }
                                    calendar.addEvent(NuevoEvento)
                                    //console.log(NuevoEvento)
                                    //Despues eliminar la opcion 
                                    EliminaCruce();
                            }
            });


           
            
            


        })
        Paciente=()=>{
            jQuery.ajax({
            url:`php/Controlador/PacienteC.php`,
            type: 'POST',
            data : {'Peticion':'BuscarPaciente','IdPaciente':jQuery('#txtDNIPaciente').val()},
            success: (data)=> {
                                //console.log(data);
                            $Obj=JSON.parse(data);
                            //console.log($Obj);
                            //console.log($Obj[0]['NOMBREPACIENTE'])                            
                            jQuery('#txtNombrePaciente').val($Obj[0]['NOMBREPACIENTE']);
                            }
            });
        }
        Examen=()=>{
            //console.log('buscar Examen')
            jQuery.ajax({
            url:`php/Controlador/ExamenC.php`,
            type: 'POST',
            data : {'Peticion':'BuscarExamen','IdExamen':jQuery('#txtCodExamen').val()},
            success: (data)=> {
                                //console.log(data);
                            $Obj=JSON.parse(data);
                            //console.log($Obj);
                            //console.log($Obj[0]['NOMBRE_EXAMEN'])                            
                            jQuery('#txtNombreExamen').val($Obj[0]['NOMBRE_EXAMEN']);
                            //SELECT NOMBRE_EXAMEN FROM `examenes_tbl` where ID_EXAMEN='EXA1'
                            }
            });
             
        }
        
        Doctor=()=>{
            //txtDNIDoctor txtNombreDoctor
            //console.log('buscar Doctor')
        
            jQuery.ajax({
            url:`php/Controlador/DoctorC.php`,
            type: 'POST',
            data : {'Peticion':'BuscarDoctores','IdDoctor':jQuery('#txtDNIDoctor').val()},
            success: (data)=> {
                                 // console.log(data);
                            $Obj=JSON.parse(data);
                            //console.log($Obj);
                            //console.log($Obj[0]['NOMBREDOCTOR'])                            
                            jQuery('#txtNombreDoctor').val($Obj[0]['NOMBREDOCTOR']);
                            //SELECT NOMBRE_EXAMEN FROM `examenes_tbl` where ID_EXAMEN='EXA1'
                            }
            });
        }

        sumar30min=(Date)=>{
                
                var fecha = Date;
                fecha.setMinutes(fecha.getMinutes() + 30);
                //var rr= fecha.setMinutes(fecha.getMinutes() + 5);
                //console.log(fecha.getHours())
                //console.log(fecha.getMinutes())
                hora=fecha.getHours();
                minutos=fecha.getMinutes();
                if(hora<10){hora='0'+hora}
                if(minutos<10){minutos='0'+minutos}
                
                // if(fecha.getHours()>10){
                //     return '0'+fecha.getHours()+':'+fecha.getMinutes();   
                // }else{
                //     return fecha.getHours()+':'+fecha.getMinutes();
                // }
                return  hora+':'+minutos;   
        }


        BuscaCruce=(Fecha,Hora)=>{
            jQuery.ajax({
            url:`php/Controlador/CitasC.php`,
            type: 'POST',
            data : {'Peticion':'ValidaCruce','Fecha':Fecha,'Hora':Hora,'IdTomografo':'1'},
            success: (data)=> {
                        $ObjCurce=JSON.parse(data);
                        //console.log($ObjCurce);
                        if ($ObjCurce['Respuesta']=='Con Cruce')
                        {
                            alert('Presenta Cruce Actualmente')
                            jQuery('#IdCruceTemporal').val('NO')
                        }
                    else{
                        jQuery('#IdCruceTemporal').val($ObjCurce['Respuesta'])
                        jQuery('#largeModal').modal();
                        //
                        jQuery('#txtDNIPaciente').val('')
                        jQuery('#txtFijo').val('')
                        jQuery('#txtEdad').val('')
                        jQuery('#txtNombrePaciente').val('')
                        jQuery('#txtCelular').val('')
                        jQuery('#txtPrecioExamen').val('')
                        jQuery('#txtPrecioExamen2').val('')
                        jQuery('#txtNombreDoctor').val('')
                        jQuery('#txtHospital').val('')
                        jQuery('#txtObservaciones').val('')
                                    jQuery('#CrearNuevo').css('display','');
                                    jQuery('#Actualiza').css('display','none');
                                    jQuery('#Eliminar').css('display','none');
                        }

                        
                    }
            });

        }
        
        EliminaCruce=(Fecha,Hora)=>{
            var IdTemporal=jQuery('#IdCruceTemporal').val();
            if (IdTemporal=='NO') {
                //console.log('Esta Actualizando');
            }
            else 
            {
                jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data : {'Peticion':'EliminaTemporal','IdTemporal':IdTemporal},
                success: (data)=> {
                                    //console.log(data);
                                }
                });
            }
            
        }
        jQuery('#txtCodExamen').change(()=> {
                //Buscamos el precio par pintarlo
                let IdExamen=jQuery('#txtCodExamen').val();

                jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data : {'Peticion':'BuscarPrecio','IdExamen':IdExamen},
                success: (data)=> {
                                    ObjPrecio=JSON.parse(data)
                                    //console.log(ObjPrecio);
                                    //console.log(ObjPrecio[0]['PRECIO']);
                                    jQuery('#txtPrecioExamen').val(ObjPrecio[0]['PRECIO']);
                                }
                });
                 
         })
        
        RecuperarDatos=(IdCita)=>{
            jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data : {'Peticion':'TrarCita','IdCita':IdCita},
                success: (data)=> {
                        //Hacer otro ajax para validar el usuario si es admin
                        ObjCita=JSON.parse(data)
                        jQuery.ajax({
                            url:'php/Config/Control.php',
                            type: 'POST',
                            data : {'Control':'TraerTipoUsuario'},
                            success:(respon)=>{
                                //console.log(respon)
                                $ObjetoValida=JSON.parse(respon);
                                //console.log($ObjetoValida);
                                if ($ObjetoValida[0]['TIPO_USUARIO']=='ADMIN') {
                                    
                                    //console.log(ObjCita)
                                    //console.log(ObjCita[0]);
                                    ArmarSelect('txtCodExamen','examenes_tbl','ID_EXAMEN','NOMBRE_EXAMEN','')
                                    ArmarSelect('txtVisitador','visitador_medico_tbl','ID_VISITADOR','NOMBRE_COMPLETO','')
                                    jQuery('#txtFecha').val(ObjCita[0]['FECHACITA']);
                                    jQuery('#txtHora').val(ObjCita[0]['HORACITA']);
                                    jQuery('#txtTitulo').val(ObjCita[0]['Titulo']);
                                    jQuery('#txtHoraFin').val(ObjCita[0]['HORAFIN']);
                                   
                                    jQuery('#txtDNIPaciente').val(ObjCita[0]['DNI_PACIENTE']);
                                    jQuery('#txtFijo').val(ObjCita[0]['TELEFONO_PACIENTE']);
                                    jQuery('#txtNombrePaciente').val(ObjCita[0]['NOMBRE_PACIENTE']);
                                    jQuery('#txtCelular').val(ObjCita[0]['CELULAR_PACIENTE']);
                                    
                                    
                                    jQuery('#txtEdad').val(ObjCita[0]['EDAD']);

                                    
                                    
                                    setTimeout(function(){ jQuery('#txtCodExamen').val(ObjCita[0]['IDEXAMEN']); }, 1000);
                                    setTimeout(function(){ jQuery('#txtVisitador').val(ObjCita[0]['ID_VISITADOR']); }, 1000);
                                    
                                    if(ObjCita[0]['CONTRASTE']=='SI')
                                    {
                                        setTimeout(function(){ jQuery('#micheckbox').click(); }, 1000);
                                        
                                    }

                                    jQuery('#txtPrecioExamen').val(ObjCita[0]['PRECIO_EXAMEN'])
                                    jQuery('#txtNombreDoctor').val(ObjCita[0]['MEDICO_ENVIA'])
                                    jQuery('#txtHospital').val(ObjCita[0]['HOSPITAL'])
                                    jQuery('#txtObservaciones').val(ObjCita[0]['OBSERVACIONES'])
                                    jQuery('#txtPrecioExamen2').val(ObjCita[0]['PRECIO2'])
                                    jQuery('#IdCita').val(IdCita);
                                    
                                    jQuery('#CrearNuevo').css('display','none');
                                    jQuery('#Actualiza').css('display','');
                                    jQuery('#Eliminar').css('display','');
                                    jQuery('#IdCruceTemporal').val('NO')
                                    jQuery('#largeModal').modal('show')
                                    // USER_CREATE: "USUARIO1"
                                }
                                else{
                                    //console.log('comparar usuarios')
                                    if($ObjetoValida[0]['NOMBRE']==ObjCita[0]['USER_CREATE'])
                                    {
                                        //console.log(ObjCita)
                                        //console.log(ObjCita[0]);
                                        ArmarSelect('txtCodExamen','examenes_tbl','ID_EXAMEN','NOMBRE_EXAMEN','')
                                        ArmarSelect('txtVisitador','visitador_medico_tbl','ID_VISITADOR','NOMBRE_COMPLETO','')
                                        jQuery('#txtFecha').val(ObjCita[0]['FECHACITA']);
                                        jQuery('#txtHora').val(ObjCita[0]['HORACITA']);
                                        jQuery('#txtTitulo').val(ObjCita[0]['Titulo']);
                                        jQuery('#txtHoraFin').val(ObjCita[0]['HORAFIN']);
                                    
                                        jQuery('#txtDNIPaciente').val(ObjCita[0]['DNI_PACIENTE']);
                                        jQuery('#txtFijo').val(ObjCita[0]['TELEFONO_PACIENTE']);
                                        jQuery('#txtNombrePaciente').val(ObjCita[0]['NOMBRE_PACIENTE']);
                                        jQuery('#txtCelular').val(ObjCita[0]['CELULAR_PACIENTE']);
                                        
                                        
                                        jQuery('#txtEdad').val(ObjCita[0]['EDAD']);

                                        
                                        
                                        setTimeout(function(){ jQuery('#txtCodExamen').val(ObjCita[0]['IDEXAMEN']); }, 1000);
                                        setTimeout(function(){ jQuery('#txtVisitador').val(ObjCita[0]['ID_VISITADOR']); }, 1000);

                                        if(ObjCita[0]['CONTRASTE']=='SI')
                                        {
                                            setTimeout(function(){ jQuery('#micheckbox').click(); }, 1000);
                                            
                                        }

                                        jQuery('#txtPrecioExamen').val(ObjCita[0]['PRECIO_EXAMEN'])
                                        jQuery('#txtNombreDoctor').val(ObjCita[0]['MEDICO_ENVIA'])
                                        jQuery('#txtHospital').val(ObjCita[0]['HOSPITAL'])
                                        jQuery('#txtObservaciones').val(ObjCita[0]['OBSERVACIONES'])
                                        jQuery('#txtPrecioExamen2').val(ObjCita[0]['PRECIO2'])
                                        jQuery('#IdCita').val(IdCita);
                                        
                                        jQuery('#CrearNuevo').css('display','none');
                                        jQuery('#Actualiza').css('display','');
                                        jQuery('#Eliminar').css('display','');
                                        jQuery('#IdCruceTemporal').val('NO')
                                        jQuery('#largeModal').modal('show')
                                        // USER_CREATE: "USUARIO1"
                                    }
                                    else{
                                        swal(' No puedes Actualizar')
                                    }
                                }
                                
                            }
                        });
                    

                                   
                                    
                                }
                });
        }

        Actualiza=()=>{
            let Datos=jQuery('#FormularioEnnviar').serialize();
            Datos=Datos+'&Peticion=ActualizaCita&IdCita='+jQuery('#IdCita').val();
            jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data :Datos,
                success: (data)=> {
                            //console.log(data);
                            calendar.render();
                            jQuery('#largeModal').modal('hide');
                            //jQuery('#ClickTomografo').click()
                            jQuery('.modal-backdrop').remove();
                            var event = calendar.getEventById(jQuery('#IdCita').val());
                            var nuevotitle=jQuery('#txtNombrePaciente').val() +'\n'+'Doctor:'+jQuery('#txtNombreDoctor').val();
                            event.setProp('title', nuevotitle);
                            // var NuevoEvento={
                            //         title:jQuery('#txtTitulo').val() +'\n'+'Doctor:'+jQuery('#txtNombreDoctor').val(),
                            //         start:jQuery('#txtFecha').val()+"T"+jQuery('#txtHora').val(),
                            //         end: jQuery('#txtFecha').val()+"T"+jQuery('#txtHoraFin').val(),
                            //         color:jQuery('#color').val(),
                            //         description:'asdasd',
                            //         textColor:'#FFFFFF',
                            //         id:data,
                            //         }
                            //         calendar.addEvent(NuevoEvento)
                            //         console.log(NuevoEvento)
                            }
            });

        }




        Eliminar=()=>{
            

            jQuery.ajax({
                url:`php/Controlador/CitasC.php`,
                type: 'POST',
                data :{'Peticion':'Eliminar','IdCita':jQuery('#IdCita').val(),'Fecha':jQuery('#txtFecha').val(),'IdTomografo':'1','Hora':jQuery('#txtHora').val()},
                success: (data)=> {
                            //console.log(data);
                            //calendar.render();
                            jQuery('#largeModal').modal('hide');
                            //jQuery('#ClickTomografo').click()
                            jQuery('.modal-backdrop').remove();
                               var eventSource = calendar.getEventById(jQuery('#IdCita').val());
                                eventSource.remove();
                            }
            });

        }


        jQuery('#txtCodExamen').change(()=>{
           // ArmarSelectCascada('txtAlternativo','ADICIONAL_EXAMEN_TBL','ID_ADICIONAL','NOMBRE','ID_EXAMEN',jQuery('#txtCodExamen').val());
           jQuery('#micheckbox')[0]['checked']=false;
        });


        jQuery( '#micheckbox' ).on( 'click', function() {
            var CostoExamen=jQuery('#txtPrecioExamen').val();
            var pointNum = parseFloat(CostoExamen);
            if( jQuery(this).is(':checked') ){
                        // Hacer algo si el checkbox ha sido seleccionado
                        if (jQuery('#txtCodExamen').val()=='0') {
                            
                        }else{
                            jQuery('#txtPrecioExamen').val(pointNum+150);
                             jQuery('#sino').html('SI')
                        }
                            
                        // alert("El checkbox con valor " + jQuery(this).val() + " ha sido seleccionado");
                        } else {
                        // Hacer algo si el checkbox ha sido deseleccionado
                        // alert("El checkbox con valor " + jQuery(this).val() + " ha sido deseleccionado");
                                if (jQuery('#txtCodExamen').val()=='0') {
                                    
                                }else{
                                    jQuery('#txtPrecioExamen').val(pointNum-150);
                                    jQuery('#sino').html('NO')
                                }
                        }
            });

        // jQuery('#txtAlternativo').change(()=>{
        //     var CostoExamen=jQuery('#txtPrecioExamen').val();
        //     var pointNum = parseFloat(CostoExamen);
        //     if (jQuery('#txtAlternativo').val()!='S') {
        //         console.log(pointNum-150);
        //         jQuery('#txtPrecioExamen').val(pointNum-150);
        //     }
        //     else{
        //         console.log(pointNum+150);
        //         jQuery('#txtPrecioExamen').val(pointNum+150);
        //     }
            
            
            
        // })

        function RemoveEvento() {
            // console.log(calendar.getEventSources())
            // console.log(calendar.getEventById(1)['title']='hola')
            // calendar.getEventById(1)['title']='hola';

            // console.log(calendar.getEventById(1));
            // var eventSource = calendar.getEventById(3);
            // eventSource.remove();
            // console.log(calendar.eventSources)
            // console.log(calendar)
            var event = calendar.getEventById('3');
        event.setProp('title', 'new title');
            
        }


Refrescar=()=>{
    Rutas('Registro','Tomografo1');
}