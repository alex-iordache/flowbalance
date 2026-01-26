import type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, LocalizedRichText, Language } from './types';
import { t } from './types';

import flow_2_Panic_Support from "./Panic-Support/flow";
import flow_3_Craving_Relief from "./Craving-Relief/flow";
import flow_4_Ease_Overwhelm from "./Ease-Overwhelm/flow";
import flow_8_Boost_Performance from "./Boost-Performance/flow";
import flow_19_Build_Self_Trust from "./Build-Self-Trust/flow";
import flow_21_Healthy_Money_Mindset from "./Healthy-Money-Mindset/flow";
import flow_22_Calm_Stories from "./Calm-Stories/flow";
import flow_26_Heartful_Gratitude from "./Heartful-Gratitude/flow";
import flow_32_Body_Release from "./Body-Release/flow";

export { t };
export type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, LocalizedRichText, Language };

export const defaultFlows: Flow[] = [
  flow_2_Panic_Support,
  flow_3_Craving_Relief,
  flow_4_Ease_Overwhelm,
  flow_8_Boost_Performance,
  flow_19_Build_Self_Trust,
  flow_21_Healthy_Money_Mindset,
  flow_22_Calm_Stories,
  flow_26_Heartful_Gratitude,
  flow_32_Body_Release,
];
