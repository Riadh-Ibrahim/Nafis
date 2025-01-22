import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./features/login/login.routes").then(m => m.LOGIN_ROUTES)
  },
  {
    path: "constantes",
    loadChildren: () => import("./features/constantes-formulaires/constantes-formulaires.routes").then(m => m.CONSTANTES_ROUTES)
  }

];
