import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, WritableSignal, input, output } from '@angular/core';
import { IMock } from '../../signalsPocDosModule.component';
import { JsonPipe } from '@angular/common';
import { IApiResponseState } from '../../../../models/sharedModels';

const childSignal: IMock = {
  titulo: "otro child- Titulo",
  subtitulo: "otro child- Subtítulo",
  listado: [{ uno: "otro child- uno", dos: 333 }],
};

@Component({
  selector: 'child-v2-signal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [JsonPipe],
  templateUrl: './child-v2-signal.component.html',
  styleUrl: './child-v2-signal.component.scss',

})
export class ChildDosSignalComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('---changes', changes)
  } 
  @Input() signalObj!: WritableSignal<IApiResponseState<IMock>>;

  public title= input<string>();
  public titleSection= input.required<string>();
  public listadoSection= input.required<string>();

  public setAllOuput= output<IMock>();

  public setAll() {
    this.signalObj.set({loading: false, error: null, payload: JSON.parse(JSON.stringify(childSignal))})
  }

  public updaTitle() {
    this.signalObj.update((state: any) =>{
      return { ...state, payload: {...state.payload, titulo: "ahhhhxxx" }}
    } );
  }

  public updateListado() {
    this.signalObj.update((state: any)=>{
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

  setAllOut(){
    this.setAllOuput.emit(JSON.parse(JSON.stringify(childSignal)))
  }
}
