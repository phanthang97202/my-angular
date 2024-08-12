import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'detail/:id',
    component: DetailsComponent,
    title: 'Detail page',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
