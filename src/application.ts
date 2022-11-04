import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuxiliarAuthenticationStrategy} from './strategies/auxiliar.strategy';
import {JefeOperacionAuthenticationStrategy} from './strategies/jefe-operacion.strategy';
import {MecanicoAuthenticationStrategy} from './strategies/mecanico.strategy';
import {PropietarioAuthenticationStrategy} from './strategies/propietario.strategy';

export {ApplicationConfig};

export class AutomationCdaBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    registerAuthenticationStrategy(this, AuxiliarAuthenticationStrategy);
    registerAuthenticationStrategy(this, MecanicoAuthenticationStrategy);
    registerAuthenticationStrategy(this, PropietarioAuthenticationStrategy);
    registerAuthenticationStrategy(this, JefeOperacionAuthenticationStrategy);

    this.component(AuthenticationComponent);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
