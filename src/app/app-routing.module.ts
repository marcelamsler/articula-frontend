import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReadArticleComponent} from "./read-article/read-article.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: 'read-article', component: ReadArticleComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
