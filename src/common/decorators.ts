import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../user/user.entity';

/**
 * Apply a set of roles to a resolver
 * @param roles List of roles to use
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

export const ALL_ROLES = [UserRole.USER, UserRole.ADMIN];

/**
 * Protect a query or resolver by applying this decorator
 * @param roles A list of user roles that have access to the resource.
 */
export const Auth = (..._roles: UserRole[]) => {
  const roles = _roles.length > 0 ? _roles : ALL_ROLES;
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
};

/**
 * Get the currently logged in user
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req.user,
);
