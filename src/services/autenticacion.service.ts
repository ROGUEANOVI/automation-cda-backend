import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import cryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import generadorClave from 'password-generator';
import {Claves} from '../config/claves';
import {Usuario} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  generarClave(){
    const clave = generadorClave(12, false);
    return clave;
  }

  encriptarClave(clave: string){
    const claveEncriptada = cryptoJS.AES.encrypt(clave,  Claves.claveSecreta).toString();
    return claveEncriptada;
  }

  desencriptarClave(claveEncriptada: string){
    const bytes = cryptoJS.AES.decrypt(claveEncriptada, Claves.claveSecreta);
    const claveDesencriptada =(bytes.toString(cryptoJS.enc.Utf8));
    return claveDesencriptada;
  }

  crearToken(usuario: Usuario){
    const token = jwt.sign(
      {
        exp: Claves.tiempoExpiraJwt,
        data: {
          id: usuario._id,
          _nombreUsuario: usuario.nombreUsuario,
          _clave: usuario.clave,
      }
    }, Claves.jwtClaveSecreta);
    return token;
  }
}
