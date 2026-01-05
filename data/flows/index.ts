import type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language } from './types';
import { t } from './types';

import flow_1_Stress_Break from "./Stress-Break/flow";
import flow_2_Connect from "./Connect/flow";
import flow_3_Dream_Up from "./Dream-Up/flow";
import flow_4_Release_Emotions from "./Release-Emotions/flow";
import flow_5_Release_Anxiety from "./Release-Anxiety/flow";
import flow_6_Sleep_Regeneration from "./Sleep-Regeneration/flow";
import flow_7_Mental_Training from "./Mental-Training/flow";
import flow_8_Sex_Education_Ages_0_5 from "./Sex-Education-Ages-0-5/flow";
import flow_9_Dream_Act_Fulfill from "./Dream-Act-Fulfill/flow";
import flow_10_Sex_Education_Ages_6_9 from "./Sex-Education-Ages-6-9/flow";
import flow_11_Sex_Education_Ages_10_14 from "./Sex-Education-Ages-10-14/flow";
import flow_12_Sex_Education_Ages_15_18 from "./Sex-Education-Ages-15-18/flow";
import flow_13_Discover_Stress_Level from "./Discover-Stress-Level/flow";

export { t };
export type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language };

export const defaultFlows: Flow[] = [
  flow_1_Stress_Break,
  flow_2_Connect,
  flow_3_Dream_Up,
  flow_4_Release_Emotions,
  flow_5_Release_Anxiety,
  flow_6_Sleep_Regeneration,
  flow_7_Mental_Training,
  flow_8_Sex_Education_Ages_0_5,
  flow_9_Dream_Act_Fulfill,
  flow_10_Sex_Education_Ages_6_9,
  flow_11_Sex_Education_Ages_10_14,
  flow_12_Sex_Education_Ages_15_18,
  flow_13_Discover_Stress_Level,
];
