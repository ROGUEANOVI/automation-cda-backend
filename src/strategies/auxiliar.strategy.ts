import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class AuxiliarAuthenticationStrategy implements AuthenticationStrategy{

  name = 'auxiliar';

  constructor(
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService
    ){}


  async authenticate(req: Request): Promise<UserProfile | undefined>{
    const token = parseBearerToken(req);
    if (token) {
      const tokenValido = this.autenticacionService.validarToken(token);

      if (tokenValido) {
        const perfil: UserProfile = Object.assign(
          {
            tokenValido: tokenValido
          }
        );
        return perfil;
      }
      else {
        throw new HttpErrors[401]("El Token NO es valido");
      }
    }
    else {
      throw new HttpErrors[401]("No se ha incluido un Token en la peticion");
    }
  }
}
