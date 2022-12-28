import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MngDataService } from '../../Services/mng-data.service';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';

@Component({
  selector: 'app-main-sidbar',
  templateUrl: './main-sidbar.component.html',
  styleUrls: ['./main-sidbar.component.css']
})
export class MainSidbarComponent implements OnInit, AfterViewInit {

  constructor(
    public data: MngDataService,
  ) { }
  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    $(document).ready (() => {
      const trees: any = $('[data-widget = "treeview"]');
      //debugger
      //trees.Treeview();
      //return
      //AdminLte.Treeview._jQueryInterface.call(trees, 'init');
      
    });
    $(document).ready (() => {
      $('[data-widget="treeview"]').each(function() {
        //debugger
        //var t = ($ as any).AdminLTE;
        //var y= Treeview();
        //AdminLte.Treeview._jQueryInterface.call($(this), 'init');
      });
    });
  }

}
