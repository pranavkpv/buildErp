import { commonOutput } from '../../dto/common';
import { AddsitetoprojectInput } from '../../Entities/addsitemanagertoproject.entity';

export interface IAddSiteToProjectUseCase {
   execute(input: AddsitetoprojectInput): Promise<commonOutput>
}