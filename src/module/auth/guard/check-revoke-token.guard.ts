import { ExecutionContext, Injectable, CanActivate, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CheckRevokeToken implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const token = request.headers.authorization.split(' ')[1];
    const result = await this.cacheManager.store.get(`TokenRevoke:${userId}`);
    if(result && result === token) {
      return false;
    }
    return true;
  }
}