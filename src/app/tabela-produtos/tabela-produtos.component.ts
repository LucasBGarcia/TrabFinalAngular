import { Produto } from './../produto';
import { Component, Input, OnInit } from '@angular/core';
import { ProdutoApiService } from '../produto-api.service';
import { Estoque } from '../estoque';

@Component({
  selector: 'tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.css']
})
export class TabelaProdutosComponent implements OnInit {
  titulo = "Tabela Produtos"
  nomePesquisado = ""
  lista: Produto[] = []
  estoque: Estoque[] = []

  constructor(private servico: ProdutoApiService) {
    this.listar()
    this.listarEstoque()
  }
  ngOnInit() {
  }

  listar() {
    this.servico.listar().subscribe((data) => {
      this.lista = data
    })
  }

  listarEstoque() {
    this.servico.listarEstoque().subscribe((data) => {
      this.estoque = data
      console.log(data)
      console.log(this.estoque)

    })
  }

  deletar(id: number) {
    console.log('deletnado')
    this.servico.deletar(id).subscribe(res => {
      this.listar()
    })
  }
  deletarEstoque(id: number) {
    console.log('deletnado')
    this.servico.deletarEstoque(id).subscribe(res => {
      this.listarEstoque()
    })
  }

}
