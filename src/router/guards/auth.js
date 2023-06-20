import LocalDataHandler from '@/utils/handlers/LocalDataHandler'
import BaseGuard from '@/router/guards/base';

class AuthGuard extends BaseGuard {
  constructor() {
    super();
  }

  async handleRouteEnter() {
    if (LocalDataHandler.getAccessToken()) {
      return new Promise(resolve => resolve(true));
    }
    return this.refreshAccessToken().then(result => {
      if (result) {
        return true;
      }
      /** keep in mind that the catch is handled in base guard (base.js) **/
      return this.routeOnFailure;
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthGuard();
    }
    return this.instance;
  }
}

export default AuthGuard.getInstance();