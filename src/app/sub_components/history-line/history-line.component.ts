import { Component,Input, Output, EventEmitter } from '@angular/core';
import { IQueryItem } from 'src/app/app.component';

@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.css']
})
export class HistoryLineComponent {

  @Input() queryItem:IQueryItem =  <IQueryItem>{}
  @Input() index:number|null = null

  @Output() wayback = new EventEmitter()
  @Output() remove = new EventEmitter()


  remove_item(item_index:any){
    this.remove.emit(item_index)
  }

  wayback_item(item:any){
    this.wayback.emit(item)
  }

}
