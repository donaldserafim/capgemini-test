import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss']
})
export class UsuarioEditarComponent implements OnInit {

  _id: String = '';
  usuarioForm: FormGroup;
  nome: String = '';
  descricao: String = '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsuario(this.route.snapshot.params['id']);
    this.usuarioForm = this.formBuilder.group({
   'nome' : [null, Validators.required],
   'descricao' : [null, Validators.required]
  });

  }

  getUsuario(id) {
    this.api.getUsuario(id).subscribe(data => {
      this._id = data.id;
      this.usuarioForm.setValue({
        nome: data.nome,
        descricao: data.descricao,
      });
    });
  }
  
  updateUsuario(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateUsuario(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/usuario-detalhe/' + this._id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
