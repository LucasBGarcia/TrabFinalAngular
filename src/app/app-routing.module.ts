import { TabelaProdutosComponent } from './tabela-produtos/tabela-produtos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormProdutosComponent } from './form-produtos/form-produtos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormEstoqueComponent } from './form-estoque/form-estoque.component';

const rotas: Routes = [
  { path: 'tabela', component: TabelaProdutosComponent },
  { path: 'novoProduct', component: FormProdutosComponent },
  { path: 'novoEstoque', component: FormEstoqueComponent },
  { path: 'novoEstoque/:id', component: FormEstoqueComponent },
  { path: 'edit/:id', component: FormProdutosComponent },
  { path: 'editEstoque/:id', component: FormEstoqueComponent },
  { path: '', redirectTo: '/tabela', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },


]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
