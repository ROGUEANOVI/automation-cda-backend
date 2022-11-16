import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import cryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import generadorClave from 'password-generator';
import twilio from 'twilio';
import {Environment} from '../config/environment';
import {Usuario} from '../models';
import {PersonaRepository, UsuarioRepository, VehiculoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository) {

  }

  MSM: string;
  client = twilio(Environment.accountSid, Environment.authToken);

  async validarPersona(_cedula: string){

    const personaValida = await this.personaRepository.findOne({where: {cedula: _cedula}});

    try {
      if(personaValida !== null){
        return true
      }
      return false
    }
    catch (error) {
      return false;
    }

  }

  async validarVehiculo(_placa: string){

    const vehiculoValido = await this.vehiculoRepository.findOne({where: {placa: _placa}});

    try {
      if(vehiculoValido !== null){
        return true
      }
      return false
    }
    catch (error) {
      return false;
    }

  }

  generarClave(){
    const clave = generadorClave(12, false);
    return clave;
  }

  encriptarClave(clave: string){
    const claveEncriptada = cryptoJS.AES.encrypt(clave,  Environment.claveSecreta).toString();
    return claveEncriptada;
  }

  desencriptarClave(claveEncriptada: string){
    const bytes = cryptoJS.AES.decrypt(claveEncriptada, Environment.claveSecreta);
    const claveDesencriptada =(bytes.toString(cryptoJS.enc.Utf8));
    return claveDesencriptada;
  }

  async validarUsuarioSignUp(_nombreUsuario: string, _clave: string){

    const usuarioValido = await this.usuarioRepository.findOne({where: {nombreUsuario: _nombreUsuario}});

    try {
      if (usuarioValido !== null) {
        return usuarioValido;
      }
      else {
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }

  async validarUsuariLogin(_nombreUsuario: string, _clave: string){

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
      }, Environment.jwtClaveSecreta,
      {expiresIn: 60}
    );
    return token;
  }

  validarToken(token: string){
    try {
      const res =jwt.verify(token, Environment.jwtClaveSecreta);
      return res;
    }
    catch (error) {
      return false;
    }
  }

  async enviarSMS( mensaje : string){

    await this.client.messages.create({
      body: mensaje,
      from: Environment.numberTwilio,
      to: Environment.numberDestination
    }).then((message) => {
      console.log(message.body);
      this.MSM = message.body;
    });

    return this.MSM;
  }

  async enviarCorreo(){

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: Environment.correoEnvio, // generated ethereal user
        pass: Environment.claveEnvio, // generated ethereal password
      },
    });

    transporter.verify()
      .then(() => {
      console.log("Correo enviado con exito");
      })
      .catch((error) => {
        console.log(error);
      })

    try {
      const email = await transporter.sendMail({
        from: `<${Environment.correoEnvio}>`,
        to: Environment.correoDestino,
        subject: "Autorizacion de Usuario ✔",
        html: `
          <b> Se ha registrado o  ha inciado sesión <strong>¡exitosamente!</strong></b>
        `, // html body
      });

      return email.accepted;
    }
    catch (error) {
      return {error}
    }
  }

}
