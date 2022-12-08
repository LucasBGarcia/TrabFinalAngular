
import { Estoque } from '../estoque';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoApiService } from '../produto-api.service';

@Component({
  selector: 'app-form-estoque',
  templateUrl: './form-estoque.component.html',
  styleUrls: ['./form-estoque.component.css']
})
export class FormEstoqueComponent {
  id!: number;
  mensagem = ""
  estoque: Estoque = new Estoque()
  botaoAcao = 'Cadastrar'
  novoCadastro = false


  constructor(
    private produtoApiService: ProdutoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.mensagem = ""
    console.log("ID", this.id);
    if (this.id) {
      this.botaoAcao = "Editar estoque"
      this.produtoApiService.buscarPorIdEstoque(this.id).subscribe(esto => {
        console.log(esto)
        if (esto != null) {
          this.estoque = esto
          console.log(this.estoque);
          this.novoCadastro = false
        } else {
          this.botaoAcao = "Add estoque"
          this.novoCadastro = true
          console.log('id ' + this.id)
          this.estoque.productId = this.id;
        }
      })
    }

  }
  private estaInserindo() {
    return !this.id
  }

  salvar() {
    if (this.novoCadastro) {
      console.log('novo cadastro' + this.novoCadastro);
      this.produtoApiService.inserirEstoqueId(this.id, this.estoque).subscribe(produto => {
        this.mensagem = this.estoque.amount + " cadastrado com sucesso"
        this.estoque = new Estoque()
        console.log(`Produto cadastrado ${produto}`)
      })
    } else {
      if (this.estaInserindo()) {
        this.produtoApiService.inserirEstoque(this.estoque).subscribe(produto => {
          this.mensagem = this.estoque.amount + " cadastrado com sucesso"
          this.estoque = new Estoque()
          console.log(`Produto cadastrado ${produto}`)
        })

      } else {
        this.produtoApiService.editarEstoque(this.id, this.estoque).subscribe(prod => {
          this.mensagem = ` editado com sucesso!`;
          this.estoque = prod;
        })
      }
    }
  }
  cancelar() {
    this.router.navigate(['/tabela'])
  }
}
