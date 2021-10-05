import React from 'react';
//developer.microsoft.com/en-us/fluentui#/get-started/web
import {loadTheme} from '@fluentui/react';
import {DefaultButton, PrimaryButton, Panel, Nav} from 'office-ui-fabric-react';
import {useBoolean} from '@uifabric/react-hooks';

loadTheme({
  palette: {
    themePrimary: '#d26f1c',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  },
});

const PanelBasicExample = () => {
  const [isOpen, {setTrue: openPanel, setFalse: dismissPanel}] = useBoolean(
    false,
  );

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
      </Panel>
    </div>
  );
};

const navLinkGroups = [
  {
    name: 'Basic components',
    expandAriaLabel: 'Expand Basic components section',
    collapseAriaLabel: 'Collapse Basic components section',
    links: [
      {
        key: 'ActivityItem',
        name: 'ActivityItem',
        url: '#/examples/activityitem',
      },
      {
        key: 'Breadcrumb',
        name: 'Breadcrumb',
        url: '#/examples/breadcrumb',
      },
      {
        key: 'Button',
        name: 'Button',
        url: '#/examples/button',
      },
    ],
  },
  {
    name: 'Extended components',
    expandAriaLabel: 'Expand Extended components section',
    collapseAriaLabel: 'Collapse Extended components section',
    links: [
      {
        key: 'ColorPicker',
        name: 'ColorPicker',
        url: '#/examples/colorpicker',
      },
      {
        key: 'ExtendedPeoplePicker',
        name: 'ExtendedPeoplePicker',
        url: '#/examples/extendedpeoplepicker',
      },
      {
        key: 'GroupedList',
        name: 'GroupedList',
        url: '#/examples/groupedlist',
      },
    ],
  },
  {
    name: 'Utilities',
    expandAriaLabel: 'Expand Utilities section',
    collapseAriaLabel: 'Collapse Utilities section',
    links: [
      {
        key: 'FocusTrapZone',
        name: 'FocusTrapZone',
        url: '#/examples/focustrapzone',
      },
      {
        key: 'FocusZone',
        name: 'FocusZone',
        url: '#/examples/focuszone',
      },
      {
        key: 'MarqueeSelection',
        name: 'MarqueeSelection',
        url: '#/examples/marqueeselection',
      },
    ],
  },
];

export const NavFabricDemoAppExample = () => {
  return (
    <Nav
      ariaLabel="Nav example similiar to one found in this demo page"
      groups={navLinkGroups}
    />
  );
};

export default function Fluent(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }
  const disabled = false;
  const checked = false;

  return (
    <React.Fragment>
      <main style={{maxWidth: '900px', margin: 'auto'}}>
        <div style={{display: 'inline-block'}}>
          <DefaultButton
            text="Standard"
            // onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            // onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <NavFabricDemoAppExample />
          <PanelBasicExample />
        </div>
      </main>
    </React.Fragment>
  );
}
