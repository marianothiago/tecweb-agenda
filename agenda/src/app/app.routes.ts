import { Routes } from '@angular/router';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoEditComponent } from './components/contato-edit/contato-edit.component';
import { LoginComponent } from './components/login/login.component';
import { accessGuard } from './security/access.guard';

export const routes: Routes = [
    {path: 'contato/list', canActivate: [accessGuard], component: ContatoListComponent},
    {path: 'contato/edit', canActivate: [accessGuard], component: ContatoEditComponent},
    {path: 'login', component: LoginComponent}
];
