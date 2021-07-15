import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Img, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { VentaI } from 'src/app/models/venta';
import { DiamantesService } from 'src/app/services/diamantes.service';

@Component({
  selector: 'app-page-factura',
  templateUrl: './page-factura.component.html',
  styleUrls: ['./page-factura.component.css']
})
export class PageFacturaComponent implements OnInit {


  respuesta:any = 'Se descargado la factura :D';
  venta:VentaI[] = [];

  constructor(private ventaSVC: DiamantesService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.router.url);
    
    
    const id = this.route.snapshot.paramMap.get('id');
    
    this.ventaSVC.getVentaID(id).subscribe(res =>{
      if(res.length>0){
        res.forEach(x => {
          this.venta.push(x as VentaI);
        });
        this.factura(this.venta[0]);
      }else{
        this.respuesta = "Nose encontro la factura lo siento :("
      }
      
    },error => {
      console.log(error);
      this.respuesta = error;
    })
  }


  
  async factura(venta:VentaI){
    const pdf = new PdfMakeWrapper();
    const numeroR =  Math.floor(Math.random()*1000);
    pdf.header(new Txt(`Factura N° ${numeroR}`).fontSize(15).end);

    pdf.add(
      
      await new Img('https://i.postimg.cc/qBnXV365/frefire.png').alignment('right').build()
      
    );

    //https://i.postimg.cc/fWB1qcTx/Whats-App-Image-2021-06-09-at-14-12-33.jpg
    pdf.add(await new Img('https://i.postimg.cc/WzkPS79j/telejas.png').build());
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt('CABINAS TELEFONICAS Y CYBER TELEJAS').fontSize(18).alignment('center').bold().end
    )
    pdf.add(pdf.ln(2));
    //pdf.add('Direccion: Nueva Aurora, calle Fenicio Angulo OE1J');
    //pdf.add('Telefono: (593) 0967031084 / (593) 0995901335');
    pdf.add(
      new Txt('Comprobante de recarga electronica del juego FreeFire').bold().end
    );
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt(`ID del Jugador: ${venta.descripcion}`).end
    );
    pdf.add(
      new Txt(`Fecha de venta realizada: ${venta.fechaVenta}`).end
    );
    pdf.add(pdf.ln(2));
    pdf.add(this.crearTablaFacutra(venta));
    pdf.add(pdf.ln(1));
    pdf.add(
      new QR(`
      https://ventadiamantes-329aa.firebaseapp.com/factura/${venta.idVentaRef}
      `).fit(150).alignment('center').end
    );
   

    pdf.footer(`Nota: Este comprabante no es valido para reclamos o en ciertas entidades gracias por preferirnos.`);



    //  pdf.create().download(`ID ${venta.descripcion}`);
     pdf.create().open();

    
  }

  crearTablaFacutra(venta:VentaI): ITable{
    const iva = venta.precioDiamante * 0.12;
    const subtotal =  venta.precioDiamante - iva;
      return new Table([
        ['Cantidad',new Txt('Descripción').bold().alignment('center').end,'V.Unitario' ,'V.Total'],
        [1, `Recarga online del Juego FreeFire diamantes ${venta.descripcionDiamantes} \n\n\n\n`,'',venta.precioDiamante],
        ['','',new Txt('SUBTOTAL').bold().alignment('right').end,subtotal.toFixed(2)],
        ['','',new Txt('IVA %12').bold().alignment('right').end, iva.toFixed(2)],
        ['','',new Txt('TOTAL').bold().alignment('right').end, venta.precioDiamante]
      ]).end;
  }
}
