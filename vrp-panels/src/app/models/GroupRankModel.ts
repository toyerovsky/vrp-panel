import { WorkerModel } from './WorkerModel';

export class GroupRankModel {
  public id: number;
  public name: string;
  public rights: number;
  public workers: WorkerModel[];
}
