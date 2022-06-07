import {
  Button,
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Select,
  SelectItem,
  TextInput,
} from "@mosheduminer/carbon-solid";
import { Component, createSignal, JSX } from "solid-js";
import { Portal } from "solid-js/web";

export default function() {
  type Props = { open: boolean; setOpen: (arg: boolean) => any };
  const ModalStateManager = (props: {
    children: (arg: Props) => JSX.Element;
    renderLauncher: Component<Props>;
  }) => {
    const [open, setOpen] = createSignal(false);
    return (
      <>
        {!props.children ? null : (
          <Portal>
            <props.children open={open()} setOpen={setOpen} />,
          </Portal>
        )}
        {props.renderLauncher && (
          <props.renderLauncher open={open()} setOpen={setOpen} />
        )}
      </>
    );
  };
  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      )}
    >
      {(props) => (
        <ComposedModal open={props.open} onClose={() => props.setOpen(false)}>
          <ModalHeader label="Account resources" title="Add a custom domain" />
          <ModalBody>
            <p style={{ marginBottom: "1rem" }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: "1rem" }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </ModalBody>
          <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
        </ComposedModal>
      )}
    </ModalStateManager>
  );
};
