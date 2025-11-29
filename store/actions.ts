import Store from '.';
import { ListItem, Settings, TodoListItem } from '../mock';
import { Flow } from '../data';
import { saveFlowsState, saveSettingsState, saveListsState } from './persistence';

export const setMenuOpen = (open: boolean) => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = (open: boolean) => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setSettings = (settings: Settings) => {
  Store.update(s => {
    s.settings = settings;
  });
  saveSettingsState();
};

// App-specific actions

export const setDone = (
  list: TodoListItem,
  listItem: ListItem,
  done: boolean,
) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    if (listIndex === -1) return;

    const items = o.lists[listIndex].items;
    const itemIndex = items?.findIndex(i => i === listItem);
    if (itemIndex === undefined || itemIndex < 0) return;

    const draftItem = s.lists[listIndex].items?.[itemIndex];
    if (!draftItem) return;

    draftItem.done = done;

    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
  saveListsState();
};

export const setPracticeFinished = (
  flowId: string,
  practiceId: string,
  finished: boolean,
) => {
  Store.update((s, o) => {
    const flowIndex = o.flows.findIndex(f => f.id === flowId);
    if (flowIndex === -1) return;

    const practiceIndex = o.flows[flowIndex].practices.findIndex(p => p.id === practiceId);
    if (practiceIndex === -1) return;

    const draftPractice = s.flows[flowIndex].practices[practiceIndex];
    if (!draftPractice) return;

    draftPractice.finished = finished;
  });
  saveFlowsState();
};

export const setFlowStarted = (flowId: string, started: boolean) => {
  Store.update((s, o) => {
    const flowIndex = o.flows.findIndex(f => f.id === flowId);
    if (flowIndex === -1) return;

    const draftFlow = s.flows[flowIndex];
    if (!draftFlow) return;

    draftFlow.started = started;
  });
  saveFlowsState();
};
