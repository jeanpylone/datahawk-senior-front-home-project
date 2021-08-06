import { DatasetId } from '../models/dataset-id.enum';
import { DateRange } from "../models/daterange.type";

export namespace AppActions {
  export class SelectDataset {
    static readonly type = '[App] select dataset';
    constructor(public datasetId: DatasetId) { }
  }
  export class SelectDateRange {
    static readonly type = '[App] select date range';
    constructor(public dateRange: DateRange) { }
  }
}
