import { Injectable, signal, WritableSignal } from "@angular/core";
import { of, } from "rxjs";
import { take, delay, tap, finalize } from "rxjs/operators";

import { IMock } from "../signalsPocModule.component";

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
export class SignalServiceService {

 private payload: WritableSignal<IMock | null> = signal(null);
 private loading: WritableSignal<boolean> = signal(false);
 private error: WritableSignal<string | null> = signal(null);
  getState() {
    return {
      loading: this.loading,
      payload: this.payload,
      error: this.error,
    };
  }

  fetchApi() {
     of(fetchSignalMock)
      .pipe(
        take(1),
        tap(()=> this.loading.set(true)),
        delay(2000),
        finalize(()=> this.loading.set(false)),
        // tap(()=> {
        //   throw new Error(`ERROR`)}
        // )
      )
      .subscribe({
        next: (res) => {
          this.payload.set(res);
          this.error.set(null);
        },
        error: (err) => {
          this.payload.set(null);
          this.error.set(err);
        }
      });
  }
}
