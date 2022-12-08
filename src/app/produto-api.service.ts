import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estoque } from './estoque';
import { Produto } from './produto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoApiService {
  baseAPI = "http://localhost:3030"
  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseAPI)
  }
  listarEstoque(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(`${this.baseAPI}/inventory`)
  }

  inserir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseAPI, produto, httpOptions)
  }

  inserirEstoque(estoque: Estoque): Observable<Estoque> {
    const uri = `${this.baseAPI}/inventory`
    return this.http.post<Estoque>(uri, estoque, httpOptions)
  }
  inserirEstoqueId(id: number, estoque: Estoque): Observable<Estoque> {
    const uri = `${this.baseAPI}/inventory/add/${id}`
    return this.http.post<Estoque>(uri, estoque, httpOptions)
  }
  buscarPorId(id: number): Observable<Produto> {
    const uri = `${this.baseAPI}/busca/${id}`;
    return this.http.get<Produto>(uri);
  }
  buscarPorIdEstoque(id: number): Observable<Estoque> {
    const uri = `${this.baseAPI}/inventory/busca/${id}`;
    return this.http.get<Estoque>(uri);
  }

  editar(id: number, produto: Produto): Observable<Produto> {
    const uri = `${this.baseAPI}/edita/${id}`;
    console.log(produto);
    return this.http.put<Produto>(uri, produto, httpOptions);
  }
  editarEstoque(id: number, estoque: Estoque): Observable<Estoque> {
    const uri = `${this.baseAPI}/inventory/atualiza/${id}`;
    console.log(estoque);
    return this.http.put<Estoque>(uri, estoque, httpOptions);
  }

  deletar(id: number) {
    const uri = `${this.baseAPI}/deleta/${id}`;
    return this.http.delete(uri);

  }

  deletarEstoque(id: number) {
    const uri = `${this.baseAPI}/inventory/deleta/${id}`;
    return this.http.delete(uri);

  }
}
