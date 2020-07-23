import { Component, OnInit } from '@angular/core';
import { ColoresService } from "../../services/colores.service";
import { Color } from "../../models/Color";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {

  colores: Color[];
  criterio = "";
  isError = false;
  showpanel = true;
  pagAct : number = 1;
  closeResult: string; 
  constructor(public colorService: ColoresService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getColores();
  }

  getColores(){
    this.colorService.get("colores").subscribe(response => {
      this.colores = response.colores;
      console.log('listaProductos',this.colores)
      this.isError = false;
      this.showpanel = false;
    }, err =>{
      this.isError = true;
      this.colores = [];
      console.log('ERROR ==>>>', err)
    });
  }

  nuevoColor(){
    this.showpanel = true;
  }


  editaColor(){
    this.showpanel = true;
  }

  grabaColor(){
    this.getColores();
  }

  cancela(){
    this.showpanel = false;
  }


  eliminaColor(idColor){
    // this.colorService.eliminarProyecto(idColor).subscribe((data:{})=>{
       this.getColores();
       
    // })
  }

  confirmaBorrar(content,idsimulacion) {
    this.modalService.open(content,{ size: 'sm' }).result.then(
      result => {
        this.closeResult = `${result}`;
        if (this.closeResult == "SI"){
          this.eliminaColor(idsimulacion);
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


}
