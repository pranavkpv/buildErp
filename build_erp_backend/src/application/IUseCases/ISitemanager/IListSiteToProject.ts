import { listAddsiteDTO } from '../../dto/addsitemanagerToproject';
import { commonOutput } from '../../dto/common';

export interface IListSiteToProjectUseCase {
   execute(page: number, search: string):
      Promise<commonOutput<{ data: listAddsiteDTO[], totalPage: number }> | commonOutput>
}