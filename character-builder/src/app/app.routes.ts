import { Routes } from '@angular/router';
import {CreateCharacterComponent} from './create-character/create-character.component';
import {RandomizeCharacterComponent} from './randomize-character/randomize-character.component';

export const routes: Routes = [
  { path: "create", component: CreateCharacterComponent },
  { path: "", redirectTo: "create", pathMatch: "full" },
  { path: "randomize", component: RandomizeCharacterComponent }
];
