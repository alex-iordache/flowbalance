import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { home, pulse, trendingUp } from 'ionicons/icons';
import { Suspense, lazy } from 'react';

import Home from './Home';
import Flows from './Flows';
import FlowCategory from './FlowCategory';
import FlowDetail from './FlowDetail';
import Practice from './Practice';
import Settings from './Settings';
import MyProgress from './MyProgress';
import Subscribe from './Subscribe';
import Store from '../../store';
import { isDesktopWeb } from '../admin/adminEnv';

const AdminRoutes = lazy(() => import('../admin/AdminRoutes'));

const Tabs = () => {
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const allowAdmin = isSuperAdmin && isDesktopWeb();
  const lang = Store.useState(s => s.settings.language);
  const isRo = lang === 'ro';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/flows" render={() => <Flows />} exact={true} />
          <Route
            path="/flows/category/:categoryId"
            render={() => <FlowCategory />}
            exact={true}
          />
          <Route
            path="/flows/:flowId"
            render={() => <FlowDetail />}
            exact={true}
          />
          <Route
            path="/flows/:flowId/:practiceId"
            render={() => <Practice />}
            exact={true}
          />
          <Route path="/settings" render={() => <Settings />} exact={true} />
          <Route path="/subscribe" render={() => <Subscribe />} exact={true} />
          <Route path="/progress" render={() => <MyProgress />} exact={true} />
          {allowAdmin ? (
            <Route
              path="/admin"
              render={() => (
                <Suspense fallback={null}>
                  <AdminRoutes />
                </Suspense>
              )}
            />
          ) : null}
          <Route render={() => <Redirect to="/home" />}/>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home">
          <IonIcon icon={home} />
          <IonLabel>{isRo ? 'Acasă' : 'Home'}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/flows">
          <IonIcon icon={pulse} />
          <IonLabel>{isRo ? 'Flows' : 'Flows'}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/progress">
          <IonIcon icon={trendingUp} />
          <IonLabel>{isRo ? 'Progresul meu' : 'My Progress'}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
