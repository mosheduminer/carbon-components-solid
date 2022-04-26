import { Tag } from "carbon-components-solid";
import { Tag16 } from "carbon-components-solid/icons/Tag16";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

const props = {
  get regular() {
    return {
      title: "Clear Filter",
      type: "gray" as const,
    };
  },
  get filter() {
    return {
      ...this.regular,
      onClick: () => {},
      onClose: () => {},
    };
  },
  get icon() {
    return {
      ...this.regular,
      renderIcon: Tag16,
    };
  },
};

export default function () {
  return (
    <>
      <div>
        <Tag class="some-class" {...props.regular}>
          This is a tag
        </Tag>
        <Tag class="some-class" {...props.regular} onClick={() => {}}>
          This is an interactive tag
        </Tag>
      </div>
      <div>
        <Tag class="some-class" {...props.filter} filter>
          This is a tag
        </Tag>
        <Tag class="some-class" {...props.icon} renderIcon={Tag16}>
          This is a tag
        </Tag>
      </div>
    </>
  );
}
