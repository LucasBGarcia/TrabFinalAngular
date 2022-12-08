import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from './produto';

@Pipe({
  name: 'filtroPesquisa',
  pure: false
})
export class FiltroPesquisaPipe implements PipeTransform {

  transform(listaProdutos: Produto[], valor?: string): Produto[] {
    const nome = valor ? valor : "";
    return listaProdutos.filter((produto) => produto.productName.includes(nome.toLocaleLowerCase()))
  }

}
