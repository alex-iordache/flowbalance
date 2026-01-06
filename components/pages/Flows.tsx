import { t, type Flow, type Language } from '../../data/flows';
import Store from '../../store';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { settingsOutline } from 'ionicons/icons';
import { FLOW_CATEGORIES } from './flowsCatalog';

function CategoryList({ flows, lang }: { flows: Flow[]; lang: Language }) {
  const history = useHistory();
  const flowsById = new Map(flows.map(f => [f.id, f]));

  return (
    <div className="p-4 w-full max-w-2xl mx-auto flex flex-col gap-4">
      {FLOW_CATEGORIES.map(cat => {
        const catFlows = cat.flowIds.map(id => flowsById.get(id)).filter(Boolean) as Flow[];
        const totalFlows = catFlows.length;
        const totalPractices = catFlows.reduce((acc, f) => acc + (f.practices?.length ?? 0), 0);
        const completedPractices = catFlows.reduce(
          (acc, f) => acc + (f.practices?.filter(p => p.finished).length ?? 0),
          0,
        );
        const pct = totalPractices === 0 ? 0 : Math.round((completedPractices / totalPractices) * 100);

        return (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => history.push(`/flows/category/${cat.id}`)}
            className={`${cat.bgClass} rounded-2xl p-5 w-full cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-white/85">
                  {totalFlows} flows • {totalPractices} practices
                </div>
                <div className="mt-1 text-lg md:text-xl font-bold text-white truncate">
                  {t(cat.title, lang)}
                </div>
              </div>
              <div className="text-white font-bold text-lg shrink-0">{pct}%</div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-white/90">
                <span>Complete</span>
                <span>
                  {completedPractices}/{totalPractices}
                </span>
              </div>
              <div className="w-full h-2 bg-white/25 rounded-full mt-1 overflow-hidden">
                <div className="h-2 bg-white/85 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Flows = () => {
  const history = useHistory();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle className="text-white">{isRo ? 'Flows' : 'Flows'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settingsOutline} className="text-white text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isRo ? 'Flows' : 'Flows'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CategoryList flows={flows} lang={lang} />
        </IonContent>
    </IonPage>
  );
  }
  
  export default Flows;
