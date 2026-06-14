import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';

export interface PracticeForegroundPlugin {
  ensurePermissions(): Promise<{ granted: boolean }>;
  openNotificationSettings(): Promise<void>;
  start(options: { title?: string; body?: string }): Promise<void>;
  update(options: { playing: boolean; title?: string; body?: string }): Promise<void>;
  stop(): Promise<void>;
  addListener(
    eventName: 'mediaPlay' | 'mediaPause' | 'mediaStop',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle>;
}

export const PracticeForeground = registerPlugin<PracticeForegroundPlugin>('PracticeForeground');
