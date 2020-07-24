import { Component, OnInit } from '@angular/core';
import { ColoresService } from "../../services/colores.service";
import { UsuarioService } from "../../services/usuario.service";
import { Colores } from "../../models/Colores";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import { FormBuilder,FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {

  frmColores: FormGroup;
  colores: Colores[];
  criterio = "";
  isError = false;
  showpanel = true;
  accessok = false;
  pagAct : number = 1;
  closeResult: string; 
  submitted = false;  
  frmUser: FormGroup;
  mensajeusuario= "";
  mensajeAccesoPerfil= "";
  constructor(public colorService: ColoresService, public usuarioService: UsuarioService,private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmColores  = this.formBuilder.group({
      _id: ['',''],
      id: ['',Validators.required],
      name: ['', Validators.required],
      color: ['', Validators.required],
      pantone: ['', Validators.required],
      year:['', Validators.required],
      usuario :['',''],
   });

   this.frmUser  = this.formBuilder.group({
    _id: ['',''],
    usuario :['',''],
    perfil :['','']
   });

  
  }

  getColores(){
  
    this.colorService.getColores(1).subscribe(response => {
      this.colores = response.colores;

      this.isError = false;
      this.showpanel = false;
    }, err =>{
      this.isError = true;
      this.colores = [];
      console.log('ERROR ==>>>', err)
    });
  }

  nuevoColor(){
    this.frmColores.reset();
    this.frmColores.controls['_id'].setValue(0);
    this.showpanel = true;
  }


  editaColor(idColor){
    this.colorService.getColor(idColor).subscribe(response => {
      this.colores = response;
      this.frmColores.controls['_id'].setValue(this.colores["color"]._id);
      this.frmColores.controls['id'].setValue(this.colores["color"].id); 
      this.frmColores.controls['name'].setValue(this.colores["color"].name); 
      this.frmColores.controls['color'].setValue(this.colores["color"].color); 
      this.frmColores.controls['pantone'].setValue(this.colores["color"].pantone); 
      this.frmColores.controls['year'].setValue(this.colores["color"].year); 
      
      this.isError = false;
      this.showpanel = true;
    }, err =>{
      this.isError = true;
      this.colores = [];
      console.log('ERROR ==>>>', err)
    });

 
  }

  grabar(){


    let params = {
      _id: this.frmColores.value._id,
      id: this.frmColores.value.id,
      name: this.frmColores.value.name,
      color: this.frmColores.value.color,
      pantone: this.frmColores.value.pantone,
      year: this.frmColores.value.year
     } 

     if (this.frmColores.value._id == 0){

      this.colorService.post(params).subscribe(resp=>{
        if(resp){       
          if(resp.color._id != this.frmColores.value._id){ 
            this.getColores();
           }
         }
       },
       err=>{
        this.isError = true;
        this.colores = [];
        this.mensajeAccesoPerfil = err.error.message;
        console.log('ERROR ==>>>', err)        
       }); 

     }else{
      this.colorService.put(params).subscribe(resp=>{
        if(resp){       
          if(resp.colorUpdate._id == this.frmColores.value._id){ 
            this.getColores();
           }
         }
       },
       err=>{
        this.isError = true;
        this.colores = [];
        this.mensajeAccesoPerfil = err.error.message;
        console.log('ERROR ==>>>', err)        
       }); 
     }



 
  }

  cancela(){
    this.getColores();
  }


  eliminaColor(idColor){
    this.colorService.deleteColor(idColor).subscribe(({})=>{
       this.getColores();
    },err =>{
      this.isError = true;
      this.mensajeAccesoPerfil = err.error.message;
      console.log('ERROR ==>>>', err) 
    })
  }



get frm() { return this.frmColores.controls; }

onSubmit() {
    this.submitted = true;
 
    if (this.frmColores.invalid) {
        return;
    }
    this.grabar();
}


confirmaBorrar(content,id) {
  this.modalService.open(content,{ size: 'sm' }).result.then(
    result => {
      this.closeResult = `${result}`;
      if (this.closeResult == "SI"){
        this.eliminaColor(id);
      }
    },
    reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
  
}




// USUARIO

ingresa() {

  let params = {
    _id: "",
    user: this.frmUser.value.usuario,
    perfil: this.frmUser.value.perfil
   } 

   this.usuarioService.post(params).subscribe(resp=>{
    if(resp){    
      if(Object.keys(resp.user).length ){ 
        this.accessok = true;
        this.mensajeusuario = "Perfil: " + resp.user[0].perfil;
        localStorage.setItem('currentUser', JSON.stringify(resp.user[0]));
        this.mensajeAccesoPerfil = "";
        this.getColores();
       }else{
        this.accessok = false;
        this.mensajeusuario = "Acceso / usuario no valido"
        localStorage.removeItem('currentUser'); 
       }
     }
   },
   err=>{
    this.isError = true;
    this.colores = [];
    console.log('ERROR ==>>>', err)        
   }); 
  
}

salir(){
  this.accessok = false;
  this.frmUser.controls['usuario'].setValue("");
  this.mensajeusuario = "";
  this.mensajeAccesoPerfil = "";
  localStorage.removeItem('currentUser'); 
}



}
