import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, WritableSignal, input, output } from '@angular/core';
import { IMock } from '../../signalsPocModule.component';
import { JsonPipe } from '@angular/common';

const childSignal: IMock = {
  titulo: "otro child- Titulo",
  subtitulo: "otro child- Subtítulo",
  listado: [{ uno: "otro child- uno", dos: 333 }],
};

@Component({
  selector: 'child-signal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [JsonPipe],
  templateUrl: './child-signal.component.html',
  styleUrl: './child-signal.component.scss',

})
export class ChildSignalComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('---changes', changes)
  } 
  @Input() signalObj!: WritableSignal<IMock>;

  public title= input.required<string>();
  public titleSection= input.required<string>();
  public listadoSection= input.required<string>();

  public setAllOuput= output<IMock>();

  public setAll() {
    this.signalObj.set(JSON.parse(JSON.stringify(childSignal)));
  }
  public updaTitle() {
    this.signalObj.update((state) => ({ ...state, titulo: "ahhhh" }));
  }

  public updateListado() {
    this.signalObj.update((state) => {
      const list = state.listado;
      list[0].dos= Math.round(Math.random()*100);
      return {
        ...state,
        listado: list,
      };
    });
  }

  setAllOut(){
    this.setAllOuput.emit(JSON.parse(JSON.stringify(childSignal)))
  }
}
