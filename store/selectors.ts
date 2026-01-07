import { createSelector } from 'reselect';
import { HomeItem, NotificationItem, Settings, TodoListItem } from '../mock';

export interface RootState {
    homeItems: HomeItem[]
    lists: TodoListItem[]
    notifications: NotificationItem[]
    settings: Settings
  }
  
export const createAppSelector = createSelector.withTypes<RootState>()

// NOTE: Don't use identity result functions with `createSelector`.
// Reselect warns in dev because `resultFn(x) => x` provides no transformation and can
// lead to confusing memoization behavior.
export const selectHomeItems = (state: RootState) => state.homeItems

export const selectLists = (state: RootState) => state.lists

export const selectNotifications = (state: RootState) => state.notifications

export const selectSettings = (state: RootState) => state.settings
