import { SetMetadata } from '@nestjs/common';
import { Action } from '../abilities/ability.factory';

export interface RequiredRule {
  action: Action;
  subject: any;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements); 