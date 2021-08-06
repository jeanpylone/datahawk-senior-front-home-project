import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppActions } from './app.actions';
import { DatasetId } from '../models/dataset-id.enum';
import { ProductRank } from '../models/product-rank.type';
import { BedroomFurnitureBSROverTime } from '../../assets/dataset/BSR/bedroom-furniture.dataset';
import { MattressesAndBoxSpringsBSROverTime } from '../../assets/dataset/BSR/mattresses-and-box-springs.dataset';
import { FurnitureBSROverTime } from '../../assets/dataset/BSR/furniture.dataset';
import * as moment from 'moment';
import { DateRange } from "../models/daterange.type";

function getDateRangedData(dataset: ProductRank[], dateRange: DateRange): ProductRank[] {
  return dataset.filter((p) => {
    const pDate = moment(p.date, 'MM/DD/YYYY');
    return pDate.isBetween(dateRange.start, dateRange.end, undefined, "[)");
  });
}

function getDateRangedFurniture(dateRange: DateRange): ProductRank[] {
  return getDateRangedData(FurnitureBSROverTime, dateRange);
}

function getDateRangedBedroomFurniture(dateRange: DateRange): ProductRank[] {
  return getDateRangedData(BedroomFurnitureBSROverTime, dateRange);
}

function getDateRangedMattressesAndBoxSprings(dateRange: DateRange): ProductRank[] {
  return getDateRangedData(MattressesAndBoxSpringsBSROverTime, dateRange);
}

export interface AppStateModel {
  dateRange: DateRange;
  dataset: { [key in DatasetId]: (dateRange:DateRange) => ProductRank[] };
  selectedDatasetId: DatasetId;
}

const defaultStartDate = moment('11/30/2019', 'MM/DD/YYYY');
const defaultDateRange = {
  start: defaultStartDate,
  end: moment(defaultStartDate).add(7, "d")
};
console.log(defaultDateRange)
const defaults: AppStateModel = {
  dateRange: defaultDateRange,
  dataset: {
    [DatasetId.BSR_FURNITURE]: getDateRangedFurniture,
    [DatasetId.BSR_BEDROOM_FURNITURE]: getDateRangedBedroomFurniture,
    [DatasetId.BSR_MATTRESSES_AND_BOX_SPRINGS]: getDateRangedMattressesAndBoxSprings,
  },
  selectedDatasetId: DatasetId.BSR_FURNITURE
}

@State<AppStateModel>({
  name: 'app',
  defaults
})
@Injectable()
export class AppState {
  constructor() {
  }

  @Selector()
  public static selectedDataset(state: AppStateModel): ProductRank[] {
    return state.dataset[state.selectedDatasetId](state.dateRange);
  }

  @Selector()
  public static selectedDatasetId(state: AppStateModel): DatasetId {
    return state.selectedDatasetId;
  }

  @Selector()
  public static selectedDateRange(state: AppStateModel): DateRange {
    return state.dateRange;
  }

  @Action(AppActions.SelectDataset)
  selectDataset({ patchState }: StateContext<AppStateModel>, { datasetId }: AppActions.SelectDataset) {
    patchState({ selectedDatasetId: datasetId });
  }

  @Action(AppActions.SelectDateRange)
  selectDateRange({ patchState }: StateContext<AppStateModel>, { dateRange }: AppActions.SelectDateRange) {
    patchState({ dateRange });
  }
}
