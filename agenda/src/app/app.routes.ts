import { Routes } from '@angular/router';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoEditComponent } from './components/contato-edit/contato-edit.component';

export const routes: Routes = [
    {path: 'contato/list', component: ContatoListComponent},
    {path: 'contato/edit', component: ContatoEditComponent}
];
