/*
Types used as the only parameter for the SkipMenu object.

SkipMenuConfig is the type for the parameter
SkipMenuConfigFull is the type used by the private methods for SkipMenu 
defaultConfig contains all the default value.

If adding/removing properties, be sure to add/remove from each the the three types below.

*/

export type SkipMenuConfig = {
  id?: string;
  attachTo?: HTMLElement;
  alwaysShow?: boolean; // This need to be changed to alwaysShow
  buttonId?: string;
  menuId?: string;
  menuContainerId?: string;
  headers?: string | false;
  headings?: string | false;
  tooltipId?: string;
  landmarks?: string | false;
  reloadOnChange?: boolean;
  useAccessKey?: boolean;
  accessKey?: string;
  tabIndex?: number | null;
  isRemoved?: boolean; // This is used internally and should not be called directly
  ignoreClass?: string;
  text?: {
    buttonLabel?: string;
    headingsLabel?: string;
    landmarksLabel?: string;
    tooltipLabel?: string;
    controlKeyLabel?: string;
    optionKeyLabel?: string;
    altKeyLabel?: string;
    shiftKeyLabel?: string;
    mainLabel?: string;
    searchLabel?: string;
    navigationLabel?: string;
    regionLabel?: string;
    complementaryLabel?: string;
    bannerLabel?: string;
    footerLabel?: string;
    sectionLabel?: string;
    formLabel?: string;
  };
  ensureAbsoluteParent?: boolean;
  theme?: 'bootstrap' | 'patternfly' | 'full' | undefined;
};

/* ***************** */

export type SkipMenuConfigFull = {
  id: string;
  attachTo: HTMLElement;
  alwaysShow: boolean; // This need to be changed to alwaysShow
  buttonId: string;
  menuId: string;
  menuContainerId: string;
  mutationObserver: MutationObserver | null;
  headers: string | false;
  headings: string | false;
  tooltipId: string;
  landmarks: string | false;
  reloadOnChange: boolean;
  useAccessKey: boolean;
  accessKey: string;
  tabIndex: number | null;
  isRemoved: boolean; // This is used internally and should not be called directly
  ignoreClass: string;
  text: {
    buttonLabel: string;
    headingsLabel: string;
    landmarksLabel: string;
    tooltipLabel: string;
    controlKeyLabel: string;
    optionKeyLabel: string;
    altKeyLabel: string;
    shiftKeyLabel: string;
    mainLabel: string;
    searchLabel: string;
    navigationLabel: string;
    regionLabel: string;
    complementaryLabel: string;
    bannerLabel: string;
    footerLabel: string;
    sectionLabel: string;
    formLabel: string;
  };
  ensureAbsoluteParent?: boolean;
};

/* ***************** */

export const defaultConfig: SkipMenuConfigFull = {
  id: 'skipMenu',
  attachTo: document.getElementsByTagName('body')[0],
  alwaysShow: true,
  headings: 'h1, h2, h3, h4, h5, h6, [role=heading]',
  landmarks:
    'main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]',
  reloadOnChange: false,
  useAccessKey: false,
  accessKey: '0',
  tabIndex: null,
  isRemoved: false,
  ignoreClass: 'skipMenu-ignore',
  text: {
    buttonLabel: 'Skip to content',
    headingsLabel: 'Headings',
    landmarksLabel: 'Landmarks',
    tooltipLabel: 'Shortcut: ',
    controlKeyLabel: 'Control',
    optionKeyLabel: 'Option',
    altKeyLabel: 'Alt',
    shiftKeyLabel: 'Shift',
    mainLabel: 'Main',
    searchLabel: 'Search',
    navigationLabel: 'Navigation',
    regionLabel: 'Region',
    complementaryLabel: 'Complementary',
    bannerLabel: 'Banner',
    footerLabel: 'Footer',
    sectionLabel: 'Section',
    formLabel: 'Form',
  },
  ensureAbsoluteParent: true,
  buttonId: '',
  menuId: '',
  menuContainerId: '',
  headers: '',
  tooltipId: '',
  mutationObserver: null,
};
