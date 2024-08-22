import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmortissementComponent } from './amortissement/amortissement.component';
import { LoginComponent } from './login/login.component';
import { DossierComponent } from './dossier/dossier.component';
import { TabarouComponent } from './tabarou/tabarou.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },

  {
    path: 'amortissement/:nooper/:cliprt',
    component:AmortissementComponent,
    // children:[
    //   {
    //     path:'statistique',
    //     component:PageStatistiqueComponent,
    //   },
    //   {
    //     path:'articles',
    //     component:PageArticlesComponent,
    //   },
    // ]
  },
  {
    path:'dossier',
    component:DossierComponent
  },
  {
    path:'',
    component:TabarouComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
