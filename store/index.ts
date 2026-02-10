import { Store as PullStateStore } from 'pullstate';

import { lists, homeItems, notifications, settings, TodoListItem, HomeItem, NotificationItem, Settings } from '../mock';
import { defaultFlows, type Flow } from '../data/flows';

type StoreProps = {
  safeAreaTop: number;
  safeAreaBottom: number;
  menuOpen: boolean;
  notificationsOpen: boolean;
  currentPage: number | null;
  homeItems: HomeItem[];
  lists: TodoListItem[];
  notifications: NotificationItem[];
  settings: Settings;
  selectedList: TodoListItem | undefined;
  flows: Flow[];
  isSuperAdmin: boolean;
  isEditor: boolean;
  overlayType: 'onboarding' | 'offline' | null;
  overlayProps: Record<string, any> | null;
  /** New onboarding: stable list of up to 4 recommended flow IDs for Home. */
  onboardingRecommendedFlowIds: string[] | null;
  /** New onboarding: selected need IDs (used to sort standalone practices). */
  onboardingSelectedNeedIds: string[] | null;
  /** Legacy onboarding (kept for backward compatibility). */
  onboardingRecommendedCategories: string[] | null;
  onboardingStart: { flowId: string; practiceId: string | null } | null;
}

const Store = new PullStateStore<StoreProps>({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  homeItems,
  lists,
  notifications,
  settings,
  selectedList: undefined,
  flows: defaultFlows,
  isSuperAdmin: false,
  isEditor: false,
  overlayType: null,
  overlayProps: null,
  onboardingRecommendedFlowIds: null,
  onboardingSelectedNeedIds: null,
  onboardingRecommendedCategories: null,
  onboardingStart: null,
});

export default Store;
