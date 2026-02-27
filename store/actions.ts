import Store from '.';
import { ListItem, Settings, TodoListItem } from '../mock';
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

export const setPracticePositionSec = (
  flowId: string,
  practiceId: string,
  sec: number,
) => {
  Store.update((s, o) => {
    const flowIndex = o.flows.findIndex(f => f.id === flowId);
    if (flowIndex === -1) return;

    const practiceIndex = o.flows[flowIndex].practices.findIndex(p => p.id === practiceId);
    if (practiceIndex === -1) return;

    const draftPractice = s.flows[flowIndex].practices[practiceIndex];
    if (!draftPractice) return;

    draftPractice.lastPositionSec = Math.max(0, sec);
  });
  saveFlowsState();
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
    if (finished) {
      draftPractice.lastPositionSec = 0; // Reset so replay starts from the beginning.
    }

    // Keep summary fields in sync (best-effort; defaults are still safe).
    const completed = s.flows[flowIndex].practices.reduce((acc, p) => acc + (p.finished ? 1 : 0), 0);
    s.flows[flowIndex].practicesCompleted = completed;
    s.flows[flowIndex].finished = completed >= s.flows[flowIndex].totalPractices;
    if (finished) {
      s.flows[flowIndex].lastPracticeFinishedId = practiceId;
    }
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

export const showOverlay = (
  type: 'onboarding' | 'offline',
  props?: Record<string, any>,
) => {
  Store.update(s => {
    s.overlayType = type;
    s.overlayProps = props ?? null;
  });
};

export const hideOverlay = () => {
  Store.update(s => {
    s.overlayType = null;
    s.overlayProps = null;
  });
};

export const setOnboardingRecommendations = (recommendedCategories: string[]) => {
  Store.update(s => {
    s.onboardingRecommendedCategories = recommendedCategories;
  });
};

export const setOnboardingRecommendedFlows = (recommendedFlowIds: string[] | null) => {
  Store.update(s => {
    s.onboardingRecommendedFlowIds = recommendedFlowIds && Array.isArray(recommendedFlowIds) ? recommendedFlowIds : null;
  });
};

export const setOnboardingSelectedNeeds = (needIds: string[] | null) => {
  Store.update(s => {
    s.onboardingSelectedNeedIds = needIds && Array.isArray(needIds) ? needIds : null;
  });
};

export const setOnboardingStart = (start: { flowId: string; practiceId: string | null } | null) => {
  Store.update(s => {
    s.onboardingStart = start;
  });
};
