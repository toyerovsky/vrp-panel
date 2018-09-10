import { WorkerModel } from './WorkerModel';
import { GroupModel } from './GroupModel';

export class GroupRankModel {
  public id: number;
  public name: string;
  public rights: number;
  public groupId: number;
  public group: GroupModel;
  public workers: WorkerModel[];
  public salary: number;
}
