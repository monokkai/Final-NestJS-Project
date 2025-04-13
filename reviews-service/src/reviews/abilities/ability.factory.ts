import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from '../interfaces/user.interface';
import { Review } from '../schemas/review.schema';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    const role: any = user?.role || 'guest';

    if (role === 'admin') {
      can(Action.Manage, 'all');
    } else if (role === 'moderator') {
      can(Action.Read, Review);
      can(Action.Update, Review);
    } else if (role === 'manager' || role === 'operator') {
      can(Action.Read, Review);
      can(Action.Update, Review);
      can(Action.Create, Review);
    } else if (role === 'user') {
      can(Action.Read, Review);
      can(Action.Create, Review);
      can(Action.Update, Review, { authorId: user.id });
      can(Action.Delete, Review, { authorId: user.id });
    } else {
      can(Action.Read, Review);
    }

    return build();
  }
} 