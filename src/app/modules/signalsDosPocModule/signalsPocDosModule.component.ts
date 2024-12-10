import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  OnInit,
  Signal,
  ViewEncapsulation,
  WritableSignal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

import { UiStoreService } from "../../store/UiStoreService.service";
import { map, Observable } from "rxjs";
import { ChildDosSignalComponent } from "./components/child-v2-signal/child-v2-signal.component";
import { JsonPipe } from "@angular/common";
import { SignalDosServiceService } from "./service/signalDosService.service";
import { IApiResponseState } from "../../models/sharedModels";

export interface IItem {
  uno: string;
  dos: number;
}
export interface IMock {
  titulo: string;
  subtitulo: string;
  listado: Array<IItem>;
}

export interface IMockFetch {
  dataLoading: WritableSignal<boolean>;
  dataPayload: WritableSignal<IMock | null>;
  dataError: WritableSignal<string | null>;
}

const defaultSignal: IMock = {
  titulo: "default - Titulo",
  subtitulo: "default - Subtítulo",
  listado: [{ uno: "default - uno", dos: 2 }],
};

const otroTituloSignal: IMock = {
  titulo: "otro - Titulo",
  subtitulo: "otro - Subtítulo",
  listado: [{ uno: "otro - uno", dos: 22 }],
};

@Component({
  selector: "signals-poc-v2-module",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [JsonPipe, ChildDosSignalComponent],
  providers: [SignalDosServiceService],
  templateUrl: "./signalsPocDosModule.component.html",
  styleUrl: "./signalsPocDosModule.component.scss",
})
export class SignalsPocDosModuleComponent implements OnInit {
  public activeView$!: Observable<string>;

  public titleSection!: Signal<string>;
  public listadoSection!: Signal<string>;

  public data!: WritableSignal<IApiResponseState<IMock>>;
  private injector = inject(Injector);

  constructor(
    private readonly uiStoreService: UiStoreService,
    private readonly service: SignalDosServiceService
  ) {}

  ngOnInit(): void {
    this.getCurrentView();
    this.fetchData();
    this.preActions();
  }

  private fetchData() {
    this.service.fetchApi();
    this.data = this.service.getState();
  }

  private preActions(){
    toObservable(this.data, {
      injector: this.injector,
    }).pipe(
      map(e=>e.loading)
    ).subscribe((res) => {
      this.uiStoreService.setGlobalLoading(res);
    });

    this.titleSection = computed(
      () => `${this.data().payload?.titulo} -- ${this.data().payload?.subtitulo}`
    );
    this.listadoSection = computed(() =>
      this.data().payload?.listado.reduce(
        (acc, curr) => acc + `${curr.uno}_${curr.dos} `,
        ""
      )?? ''
    );
  }

  private getCurrentView() {
    this.activeView$ = this.uiStoreService.getActiveView();
  }

  public setAll() {
    this.data.set({loading: false, error: null, payload: JSON.parse(JSON.stringify(otroTituloSignal))})
  }

  public updaTitle() {
    this.data.update((state: any) =>{
      return { ...state, payload: {...state.payload, titulo: "ehhhh" }}
    } );
  }

  public updateListado() {
    this.data.update((state: any)=>{
      const list = state.payload.listado;
      list[0].dos = Math.round(Math.random() * 100);
      return {
        ...state,
        payload: {
          ...state.payload,
          listado: list,
        }
      };
    })
  }

  public updateListadoSize(action: boolean) {
    this.data.update((state: any) => {
      const list = state.payload?.listado;
      action ? list?.push({ uno: "tres", dos: 2222 }) : list?.pop();
      return {
        ...state,
        payload: {
          ...state.payload,
          listado: list
        }
      };
    });
  }

  public handleSetAll(dat: IMock) {
    this.data.set({loading: false, error: null, payload: JSON.parse(JSON.stringify(dat))})
  }
}
