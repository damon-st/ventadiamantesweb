export class VentaI{
    colorValorPorVenta?: string;
    colorVendedor?:string;
    descripcion?: string;
    descripcionDiamantes?: string;
    fechaVenta?: string;
    idVentaRef?: string;
    image?: any[];
    numeroVenta?: number;
    precioDiamante?: number;
    vendedorName?:string;
    vendedorUID?: string;
    cancel?:boolean;
}

export class ImagesRef{
    img: string;
}

export class Agrupado{
    fecha?: any;
    venta?: VentaI[];
}

export class Llaves{
    value: any;
}