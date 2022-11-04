import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import cryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import generadorClave from 'password-generator';
import {Claves} from '../config/claves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';



@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository,) {}

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

  async validarUsuario(_nombreUsuario: string, _clave: string){

    const usuarioValido = await this.usuarioRepository.findOne({where: {nombreUsuario: _nombreUsuario}});

    try {
      if (usuarioValido !== null) {
      const claveDesencriptada = this.desencriptarClave(usuarioValido.clave);
        if (claveDesencriptada === _clave) {
          return usuarioValido;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }

  generarToken(usuario: Usuario){
    const token = jwt.sign(
      {
        data: {
          id: usuario._id,
          _nombreUsuario: usuario.nombreUsuario,
          _clave: usuario.clave,
        }
      }, Claves.jwtClaveSecreta,
      {expiresIn: 60}
    );
    return token;
  }

  validarToken(token: string){
    try {
      const res =jwt.verify(token, Claves.jwtClaveSecreta);
      return res;
    }
    catch (error) {
      return false;
    }
  }

}
