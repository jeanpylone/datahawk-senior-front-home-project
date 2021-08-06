import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { DatasetId } from '../../../../models/dataset-id.enum';
import { DateRange } from "../../../../models/daterange.type";
import * as moment from "moment";
declare var $:any;

@Component({
  selector: 'dh-rank-viewer-filters',
  templateUrl: './rank-viewer-filters.component.html',
  styleUrls: ['./rank-viewer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankViewerFiltersComponent implements OnInit, AfterViewInit {
  @ViewChild("dateRangeElement") dateRangeElement!:ElementRef;

  @Input() selectedId: DatasetId | null = null;
  @Input() datasetIds: DatasetId[] | null = [];
  @Input() selectedDateRange: DateRange | null = null;

  @Output() datasetSelect: EventEmitter<DatasetId> = new EventEmitter<DatasetId>();
  @Output() dateRangeSelect: EventEmitter<DateRange> = new EventEmitter<DateRange>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // TODO: minDate and maxDate fed by data source when data source becomes dynamic
    const firstDataAvailableDate = new Date(2019,10,7);
    const lastDataAvailableDate = new Date(2019,11,6);
    $(this.dateRangeElement.nativeElement).daterangepicker({
      minDate: firstDataAvailableDate,
      maxDate: lastDataAvailableDate,
      startDate: this.selectedDateRange?.start,
      endDate: this.selectedDateRange?.end,
      autoApply:true,
      ranges: {
        'Last 3 days': [moment(lastDataAvailableDate).subtract(2, "d"), moment(lastDataAvailableDate)],
        'Last 7 Days': [moment(lastDataAvailableDate).subtract(6, 'days'), moment(lastDataAvailableDate)],
        'Last 30 Days': [moment(lastDataAvailableDate).subtract(29, 'days'), moment(lastDataAvailableDate)],
        'This Month': [moment(lastDataAvailableDate).startOf('month'), moment(lastDataAvailableDate)]
      },
    }, (start:Date,  end:Date) => this.dateRangeSelect.emit({
      start: moment(start),
      end: moment(end)
    }));
  }

  onDatasetClick(datasetId: string) {
    this.datasetSelect.emit(datasetId as DatasetId);
  }

  get startDate(): Date|undefined {
    return this.selectedDateRange?.start?.toDate();
  }

  get endDate(): Date|undefined {
    return this.selectedDateRange?.end?.toDate();
  }
}
