import { commonOutput } from '../../dto/common';
import { AddsitetoprojectInput } from '../../entities/addsitemanagertoproject.entity';

export interface IAddSiteToProjectUseCase {
   execute(input: AddsitetoprojectInput): Promise<commonOutput>
}