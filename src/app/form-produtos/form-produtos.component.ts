import { Produto } from './../produto';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoApiService } from '../produto-api.service';
import { Estoque } from '../estoque';

@Component({
  selector: 'form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {
  id!: number;
  mensagem = ""
  produto: Produto = new Produto()
  estoque: Estoque = new Estoque()
  botaoAcao = 'Cadastrar'

  constructor(
    private produtoApiService: ProdutoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.mensagem = ""
    if (this.id) {
      this.botaoAcao = "Editar"
      this.produtoApiService.buscarPorId(this.id).subscribe(prod => {
        this.produto = prod;
      })
    }
  }

  private estaInserindo() {
    return !this.id
  }

  salvar() {
    if (this.estaInserindo()) {
      this.produtoApiService.inserir(this.produto).subscribe(produto => {
        this.mensagem = this.produto.productName + " cadastrado com sucesso"
        this.produto = new Produto()
        console.log(`Produto cadastrado ${produto}`)
      })

    } else {
      this.produtoApiService.editar(this.id, this.produto).subscribe(prod => {
        this.mensagem = `${prod.productName} editado com sucesso!`;
        this.produto = prod;
      })
    }
  }

  cancelar() {
    this.router.navigate(['/tabela'])
  }

}
