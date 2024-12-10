import { Injectable, signal, WritableSignal } from "@angular/core";
import { of } from "rxjs";
import { take, delay, tap, finalize } from "rxjs/operators";

import { IMock } from "../signalsPocDosModule.component";
import {
  ApiResponseInitialState,
  IApiResponseState,
} from "../../../models/sharedModels";

const fetchSignalMock: IMock = {
  titulo: "fetch - title",
  subtitulo: "fetch - Subtítulo",
  listado: [
    { uno: "fetch - uno", dos: 11 },
    { uno: "fetch - dos", dos: 22 },
    { uno: "fetch - tres", dos: 33 },
  ],
};

@Injectable()
export class SignalDosServiceService {
  private initialState = { ...ApiResponseInitialState };
  private signalServiceState: WritableSignal<IApiResponseState<IMock>> = signal(
    this.initialState
  );

  getState() {
    return this.signalServiceState;
  }

  fetchApi() {
    of(fetchSignalMock)
      .pipe(
        take(1),
        tap(() =>
          this.signalServiceState.update((state) => ({
            ...state,
            loading: true,
          }))
        ),
        delay(2000),
        finalize(() =>
          this.signalServiceState.update((state) => ({
            ...state,
            loading: false,
          }))
        ),
        // tap(()=> {
        //   throw new Error(`ERROR`)}
        // )
      )
      .subscribe({
        next: (res) => {
          this.signalServiceState.update((state) => ({
            ...state,
            error: null,
            payload: res,
          }));
        },
        error: (err) => {
          this.signalServiceState.update((state) => ({
            ...state,
            error: err,
            payload: null,
          }));
        },
      });
  }
}
