import { Store as PullStateStore } from 'pullstate';

import { lists, homeItems, notifications, settings, TodoListItem, HomeItem, NotificationItem, Settings } from '../mock';
import { flows, Flow } from '../data';

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
  flows,
});

export default Store;
