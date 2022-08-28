import { IPerson } from './index';

export interface IWorkOrdersCommand {
  exec_time: number;
  response: IWorkOrdersCommandResponse;
}
export interface IWorkOrdersCommandResponse {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  data: IWorkOrder[];
}
export interface IWorkOrder {
  work_order_id?: number;
  description: string;
  received_date: string;
  assigned_to: IPerson[];
  status: string;
  priority: string;
}
