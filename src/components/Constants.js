// Created by Alfredo Rodriguez.
// <summary>
// Constants file contains all enums and constants that are necessary to other files.
// </summary>
export const Constants = {
    UrlEndpoints: {
        home: '/',
        login: '/login',
        register: '/registro',
        companyRegister: '/registro/empresa',
        clientRegister: '/registro/cliente',
        categories: '/categorias',
        products: '/productos',
        productDetail: '/productos/detalle',
        cart: '/carrito',
        checkout: '/checkout',
        account: '/cuenta',
        accountContact: '/cuenta/contacto',
        accountAddress: '/cuenta/domicilios',
        accountOrders: '/cuenta/ordenes',
        accountOrderDetail: '/cuenta/ordenes/detalle',
        accountProducts: '/cuenta/productos',
        accountProductEdit: '/cuenta/productos/editar',
        accountStores: '/cuenta/tiendas',
        accountStoreEdit: '/cuenta/tiendas/editar',
        privacy: '/aviso-privacidad',
        tou: '/terminos-y-condiciones',
        faq: '/preguntas-frecuentes',
        stores: '/sucursales',
        contactUs: '/contacto',
    },
    ValidationMessages: {
        name: "Ingrese su(s) nombre(s).",
        surname: "Ingrese su(s) apellido(s).",
        companyName: "Ingrese la razón social de la empresa.",
        email: "Por favor incluya un correo con un '@' y una terminación correcta.",
        tou: "Debe aceptar los términos y condiciones para continuar.",
        privacy: "Debe aceptar que sus datos sean tratados de acuerdo con nuestro aviso de privacidad.",
        password: "Ingrese una contraseña.",
        productImage: "Agregue una imagen del producto.",
        productName: "Ingrese el nombre del producto.",
        category: "Seleccione una categoría.",
        productDescription: "Ingrese la descripción del producto.",
        productPrice: "Ingrese un precio a menudeo del producto.",
        wholesalePrice: "Ingrese un precio a mayoreo del producto.",
        wholesaleAmount: "Ingrese la cantidad mínima de artículos para que aplique el precio de mayoreo.",
        storeName: "Ingrese el nombre de la sucursal.",
        address: "Ingrese un domicilio.",
        neighborhood: "Ingrese una colonia.",
        city: "Ingrese una ciudad.",
        state: "Ingrese un estado.",
        country: "Ingrese un país.",
        zip: "Ingrese un código postal.",
        phone: "Ingrese un número de teléfono en formato de 10 dígitos.",
        sundayStart: "Ingrese el horario de apertura de la sucursal en domingos.",
        sundayEnd: "Ingrese el horario de cierre de la sucursal en domingos.",
        weekStart: "Ingrese el horario de apertura de la sucursal de lunes a sábado.",
        weekEnd: "Ingrese el horario de cierre de la sucursal de lunes a sábado.",
    },
    ModalType: {
        CONTACT: 0,
        ADDRESS: 1,
        PAYMENT: 2
    },
    DeliveryType: {
        DELIVERY: "1",
        PICKUP: "2"
    },
    PaymentType: {
        CARD: "1",
        CASH: "2"
    },
    AccountType: {
        CLIENT: 1,
        COMPANY: 2
    },
    SortOptions: [
        { label: 'No ordenar', value: '', asc: true },
        { label: 'Menor precio', value: 'Price', asc: true },
        { label: 'Mayor precio', value: 'Price', asc: false },
        { label: 'A-Z', value: 'Name', asc: true },
        { label: 'Z-A', value: 'Name', asc: false }
    ],
    PayPalStateCodes: {
        Aguascalientes: 'AGS',
        'Baja California': 'BC',
        'Baja California Sur': 'BCS',
        Campeche: 'CAMP',
        Chiapas: 'CHIS',
        Chihuahua: 'CHIH',
        'Ciudad de México': 'CDMX',
        Coahuila: 'COAH',
        Colima: 'COL',
        'Distrito Federal': 'DF',
        Durango: 'DGO',
        'Estado de México': 'MEX',
        Guanajuato: 'GTO',
        Guerrero: 'GRO',
        Hidalgo: 'HGO',
        Jalisco: 'JAL',
        Michoacán: 'MICH',
        Morelos: 'MOR',
        Nayarit: 'NAY',
        'Nuevo León': 'NL',
        Oaxaca: 'OAX',
        Puebla: 'PUE',
        Querétaro: 'QRO',
        'Quintana Roo': 'Q ROO',
        'San Luis Potosí': 'SLP',
        Sinaloa: 'SIN',
        Sonora: 'SON',
        Tabasco: 'TAB',
        Tamaulipas: 'TAMPS',
        Tlaxcala: 'TLAX',
        Veracruz: 'VER',
        Yucatán: 'YUC',
        Zacatecas: 'ZAC'
    }
}