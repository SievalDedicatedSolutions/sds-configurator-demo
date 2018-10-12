import { ConfiguratorProject } from '@sieval/hub-client';
import { ConfiguratorLayout } from './configurator-layout';

export interface ConfiguratorConfig {
  project?: ConfiguratorProject;
  polygonId?: string;
  languageCode?: string;
  material?: {
    materialId?: number;
    applicationId?: number;
    materialCode?: string;
  };
  startWithDefaultModel?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  webshopHandlesSamples?: boolean;
  settings?: {
    layout?: ConfiguratorLayout;
  };
}
