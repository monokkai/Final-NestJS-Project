import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../abilities/ability.factory';
import { CHECK_ABILITY, RequiredRule } from '../decorators/abilities.decorator';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(
      CHECK_ABILITY,
      context.getHandler(),
    ) || [];

    if (rules.length === 0) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();
    
    const userObject = user || { role: 'guest', id: null, username: 'guest' };
    
    const ability = this.abilityFactory.defineAbility(userObject);

    const hasPermission = rules.every((rule) =>
      ability.can(rule.action, rule.subject),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `You are not allowed to ${rules.map(r => r.action).join(', ')} this resource`,
      );
    }

    return true;
  }
} 