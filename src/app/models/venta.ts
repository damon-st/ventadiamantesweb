export class VentaI{
    colorValorPorVenta?: string;
    colorVendedor?:string;
    descripcion?: string;
    descripcionDiamantes?: string;
    fechaVenta?: string;
    idVentaRef?: string;
    image?: ImagesRef[];
    numeroVenta?: number;
    precioDiamante?: number;
    vendedorName?:string;
    vendedorUID?: string;

}

export class ImagesRef{
    img: string;
}