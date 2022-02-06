import { Tag } from "../../../lib/src";
import { Tag16 } from "../../../lib/src/icons/Tag16";

const props = {
  get regular() {
    return {
      title: "Clear Filter",
      type: "gray" as const,
    }
  },
  get filter() {
    return {
      ...this.regular,
      onClick: () => { },
      onClose: () => { },
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
        <>
          <Tag class="some-class" {...props.regular}>
            This is a tag
          </Tag>
          <Tag class="some-class" {...props.regular} onClick={() => { }}>
            This is an interactive tag
          </Tag>
        </>
      </div>
      <div>
        <Tag class="some-class" {...props.filter} filter>
          This is a tag
        </Tag>
        <Tag class="some-class" {...props.icon}>
          This is a tag
        </Tag>
      </div>
    </>
  );
}
