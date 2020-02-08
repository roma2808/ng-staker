import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'anms-stake-list',
  templateUrl: './stake-list.component.html',
  styleUrls: ['./stake-list.component.scss'], 
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeListComponent implements OnInit {
  @Input()data;
  columnsToDisplay = ['Staker', 'Worker', 'Value', 'Duration'];
  constructor() { }

  ngOnInit() {
  }

}

