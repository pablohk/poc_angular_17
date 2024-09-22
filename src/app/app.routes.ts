import { Routes } from '@angular/router';
import { ControlFlowComponent } from './control_flow/control_flow.component';
import { HomeComponent } from './home/home.component';
import { AbsoluteComponent } from './absolute/absolute.component';
import { LongArrayComponent } from './long-array/long-array.component';
import { LazyForloopRxjsComponent } from './lazy-forloop-rxjs/lazy-forloop-rxjs.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'control_flow',
        component: ControlFlowComponent
    },
    {
        path:'long-array',
        component: LongArrayComponent
    },
    {
        path:'lazy-forloop-rxjs',
        component: LazyForloopRxjsComponent
    },
    {
        path:'absolute',
        component: AbsoluteComponent
    },
    {
        path:'**',
        component: HomeComponent
    },
];
