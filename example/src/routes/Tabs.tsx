import { Tab, TabList, TabPanel, TabPanels, Tabs } from "carbon-components-solid";
import { Button } from "carbon-components-solid";

const Container = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained light>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long title</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        Tab Panel 2 <Button>Example button</Button>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export default Container;