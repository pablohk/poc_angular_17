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
import { Observable } from "rxjs";
import { ChildSignalComponent } from "./components/child-signal/child-signal.component";
import { JsonPipe } from "@angular/common";
import { SignalServiceService } from "./service/signalService.service";
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
  selector: "signals-poc-module",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [JsonPipe, ChildSignalComponent],
  providers: [SignalServiceService],
  templateUrl: "./signalsPocModule.component.html",
  styleUrl: "./signalsPocModule.component.scss",
})
export class SignalsPocModuleComponent implements OnInit {
  public activeView$!: Observable<string>;

  public titleSection!: Signal<string>;
  public listadoSection!: Signal<string>;

  public payload!: WritableSignal<IMock>;
  public loading!: WritableSignal<boolean>;
  public error!: WritableSignal<string | null>;
  private injector = inject(Injector);

  constructor(
    private readonly uiStoreService: UiStoreService,
    private readonly service: SignalServiceService
  ) {}

  ngOnInit(): void {
    this.getCurrentView();
    this.fetchData();
    this.preActions();
  }

  private fetchData() {
    this.service.fetchApi();
    const { loading, payload, error } = this.service.getState();
    this.loading = loading;
    this.payload = payload as WritableSignal<IMock>;
    this.error = error;
  }

  private preActions(){
    toObservable(this.loading, {
      injector: this.injector,
    }).subscribe((res) => {
      this.uiStoreService.setGlobalLoading(res);
    });

    this.titleSection = computed(
      () => `${this.payload().titulo} -- ${this.payload().subtitulo}`
    );
    this.listadoSection = computed(() =>
      this.payload().listado.reduce(
        (acc, curr) => acc + `${curr.uno}_${curr.dos} `,
        ""
      )
    );
  }

  private getCurrentView() {
    this.activeView$ = this.uiStoreService.getActiveView();
  }

  public setAll() {
    this.payload.set(JSON.parse(JSON.stringify(otroTituloSignal)));
  }

  public updaTitle() {
    this.payload.update((state) => ({ ...state, titulo: "ehhhh" }));
  }

  public updateListado() {
    this.payload.update((state) => {
      const list = state.listado;
      list[0].dos = Math.round(Math.random() * 100);
      return {
        ...state,
        listado: list,
      };
    });
  }

  public updateListadoSize(action: boolean) {
    this.payload.update((state) => {
      const list = state.listado;
      action ? list.push({ uno: "tres", dos: 2222 }) : list.pop();
      return {
        ...state,
        listado: list,
      };
    });
  }
  public handleSetAll(data: IMock) {
    this.payload.set(JSON.parse(JSON.stringify(data)));
  }
}
