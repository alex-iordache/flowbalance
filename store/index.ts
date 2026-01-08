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
  overlayType: 'onboarding' | 'offline' | null;
  overlayProps: Record<string, any> | null;
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
  overlayType: null,
  overlayProps: null,
});

export default Store;
