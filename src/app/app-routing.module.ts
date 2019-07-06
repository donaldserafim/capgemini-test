import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { UsuarioNovoComponent } from './usuario-novo/usuario-novo.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { title: 'Lista de Usuários' }
  },
  {
    path: 'usuario-detalhe/:id',
    component: UsuarioDetalheComponent,
    data: { title: 'Detalhe do Usuário' }
  },
  {
    path: 'usuario-novo',
    component: UsuarioNovoComponent,
    data: { title: 'Adicionar Usuário' }
  },
  {
    path: 'usuario-editar/:id',
    component: UsuarioEditarComponent,
    data: { title: 'Editar o Usuário' }
  },
  { path: '',
    redirectTo: '/usuarios',
    pathMatch: 'full'
  },
  { path: 'login', 
    component: LoginComponent 
  },
  { path: 'logout', 
    component: LogoutComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
