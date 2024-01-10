const createformname = /^[a-zA-Z]{1,10}$/;
const createformimage = /^https?:\/\/.*\.(png|jpg|jpeg)$/;


export function validationFormCreate(createData) {
    let error = {};
    if(!createformname.test(createData.name)){
      error.name = 'El nombre solo puede tener 10 caracteres, acepta mayusculas y minisculas'
    }

    if(!createformimage.test(createData.image)){
      error.image = "El campo debe ser una URL de imagen (png,jpg,jpeg)."
    }

    return error;
  }

