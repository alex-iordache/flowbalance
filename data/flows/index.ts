import type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, LocalizedRichText, Language } from './types';
import { t } from './types';

import flow_3_Craving_Relief from "./Craving-Relief/flow";
import flow_4_Ease_Overwhelm from "./Ease-Overwhelm/flow";
import flow_8_Improve_Sleep from "./Improve-Sleep/flow";
import flow_19_Build_Self_Trust from "./Build-Self-Trust/flow";
import flow_21_Healthy_Money_Mindset from "./Healthy-Money-Mindset/flow";
import flow_22_Calm_Stories from "./Calm-Stories/flow";
import flow_26_Heartful_Gratitude from "./Heartful-Gratitude/flow";
import flow_27_Boost_Motivation from "./Boost-Motivation/flow";
import flow_28_Self_Compassion from "./Self-Compassion/flow";
import flow_29_Daily_Heart_Lift from "./Daily-Heart-Lift/flow";
import flow_32_Body_Release from "./Body-Release/flow";

export { t };
export type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, LocalizedRichText, Language };

export const defaultFlows: Flow[] = [
  flow_3_Craving_Relief,
  flow_4_Ease_Overwhelm,
  flow_8_Improve_Sleep,
  flow_19_Build_Self_Trust,
  flow_21_Healthy_Money_Mindset,
  flow_22_Calm_Stories,
  flow_26_Heartful_Gratitude,
  flow_27_Boost_Motivation,
  flow_28_Self_Compassion,
  flow_29_Daily_Heart_Lift,
  flow_32_Body_Release,
];
