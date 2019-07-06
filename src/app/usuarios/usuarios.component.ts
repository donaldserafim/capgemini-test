import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Usuario } from '../model/Usuario';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'descricao', 'acao'];
  dataSource: Usuario[];
  isLoadingResults = true;

  constructor(private _api: ApiService,private loginService:AuthenticationService) { }

  ngOnInit() {
    this._api.getUsuarios()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
