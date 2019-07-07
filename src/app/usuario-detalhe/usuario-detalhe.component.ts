import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss']
})
export class UsuarioDetalheComponent implements OnInit {

  usuario: Usuario = { id: '', nome: '', descricao: ''};
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getUsuario(this.route.snapshot.params['id']);
  }

  getUsuario(id) {
    this.api.getUsuario(id)
      .subscribe(data => {
        this.usuario = data;
        console.log(this.usuario);
        this.isLoadingResults = false;
      });
  }

  deleteUsuario(id) {
    this.isLoadingResults = true;
    this.api.deleteUsuario(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/h2-console']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
