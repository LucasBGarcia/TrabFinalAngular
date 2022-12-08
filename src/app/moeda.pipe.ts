import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moeda'
})
export class MoedaPipe implements PipeTransform {

  transform(valor: number): string {
    const valorDecimal = valor.toFixed(2)
    const valorMoeda = "R$ " + valorDecimal.replace('.', ',')
    return valorMoeda;
  }

}
