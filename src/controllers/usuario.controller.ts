// import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef, HttpErrors, param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';


// @authenticate('auxiliar')
export class UsuarioController {

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,
  ) {}

  // @authenticate.skip()
  @post('/usuarios-validacion')
  @response(200, {
    description: 'Validacion de Usuario',
  })
  async validarUsuario(
    @requestBody() credenciales: Credenciales
  ) {
    const usuarioValidado = await this.autenticacionService.validarUsuariLogin(credenciales._nombreUsuario, credenciales._clave);
    if (usuarioValidado) {
      const token = this.autenticacionService.generarToken(usuarioValidado);
      const SMS = await this.autenticacionService.enviarSMS(`El usuario ${usuarioValidado.nombreUsuario} ha iniciado sesión`);
      const email = await this.autenticacionService.enviarCorreo();
      usuarioValidado.clave = '';
      return {
        datosUsuario: usuarioValidado,
        SMS: SMS,
        email: email,
        token,
      };
    } else {
      throw new HttpErrors[401]('Nombre de Usuario o clave incorrecto(a)');
    }
  }

  // @authenticate.skip()
  @post('/usuarios-registro')
  @response(200, {
    description: 'Registro de Usuario',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async registrarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, '_id'>,
  ) {
    const usuarioExistente = await this.autenticacionService.validarUsuarioSignUp(usuario.nombreUsuario, usuario.clave);
    console.log(usuarioExistente);

    if(usuarioExistente){
      return {
        nombreUsuario: usuarioExistente.nombreUsuario,
        mensaje: "Este nombre de usuario ya esta en uso"
      }
    }
    else{

      usuario.clave = this.autenticacionService.encriptarClave(usuario.clave);
      const usuarioRegistrado = await this.usuarioRepository.create(usuario);
      const token = this.autenticacionService.generarToken(usuarioRegistrado);
      const SMS = await this.autenticacionService.enviarSMS(`El usuario ${usuarioRegistrado.nombreUsuario} se ha registrado`);
      const email = await this.autenticacionService.enviarCorreo();
      usuarioRegistrado.clave = '';
      return {
        datosUsuario: usuarioRegistrado,
        SMS: SMS,
        email: email,
        token,
      };
    }

  }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, '_id'>,
  ) {
    const usuarioExistente = await this.autenticacionService.validarUsuarioSignUp(usuario.nombreUsuario, usuario.clave);
    console.log(usuarioExistente);

    if(usuarioExistente){
      return {
        nombreUsuario: usuarioExistente.nombreUsuario,
        mensaje: "Este nombre de usuario ya esta en uso"
      }
    }
    else{
      usuario.clave = this.autenticacionService.encriptarClave(usuario.clave);
      return this.usuarioRepository.create(usuario);
    }

  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuario) where?: Where<Usuario>): Promise<Count> {
    return this.usuarioRepository.count(where);
  }


  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    // return this.usuarioRepository.find(filter);
    const listUsuarios = this.usuarioRepository.find(filter);
    const listUsuariosEncriptados = (await listUsuarios).map((usuario) => {
      usuario.clave = this.autenticacionService.desencriptarClave(usuario.clave)
      return usuario
    });
    return listUsuariosEncriptados;
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    usuario.clave = this.autenticacionService.encriptarClave(usuario.clave);
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
