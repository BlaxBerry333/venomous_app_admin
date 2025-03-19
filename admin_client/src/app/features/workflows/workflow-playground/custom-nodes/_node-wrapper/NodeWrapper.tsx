import type { NamedExoticComponent, ReactNode } from "react";
import { memo } from "react";

import { Workflows } from "~/app/features/workflows/_types";
import {
  usePlaygroundActionStatusStore,
  usePlaygroundSelectedNodeStore,
} from "~/app/features/workflows/workflow-playground/_hooks";
import { useNodeStyle } from "~/app/features/workflows/workflow-playground/_hooks/core";
import { elementID } from "~/app/features/workflows/workflow-playground/custom-nodes-detail/NodeDetail";
import { BasePosition } from "~/ui/_helpers";
import { CardWithActions, Portal } from "~/ui/components";
import NodeWrapperConnectionDots from "./NodeWrapperConnectionDots";
import NodeWrapperIcon from "./NodeWrapperIcon";

interface NodeWrapperProps extends Workflows.NodeProps {
  cardContent?: ReactNode;
  portalDetailContent: ReactNode;
  isMultipleItems?: boolean;
}

const NodeWrapper: NamedExoticComponent<NodeWrapperProps> = memo(
  ({ cardContent, portalDetailContent, isMultipleItems = false, ...nodeProps }) => {
    const { id, type, selected, data } = nodeProps;
    const isFormInvalid: boolean = Boolean(data?.isFormInvalid);
    const isBlocked: boolean = Boolean(data?.isBlocked);

    const nodeStyle = useNodeStyle({ type, selected, isFormInvalid });

    const { selectedNode, setSelectedNode } = usePlaygroundSelectedNodeStore();

    const { openNodeDeleteConfirmModal, openNodeDetailModal } = usePlaygroundActionStatusStore();

    return (
      <CardWithActions
        isBlocked={isBlocked}
        onClick={() => setSelectedNode(nodeProps)}
        title={type}
        subTitle={`#${id}`}
        avatar={<NodeWrapperIcon nodeType={type} />}
        wrapperSx={nodeStyle.wrapper}
        headerSx={nodeStyle.header}
        contentSx={nodeStyle.content}
        popoverPosition={BasePosition.BOTTOM_LEFT}
        actionItemList={[
          {
            title: "Edit",
            icon: "solar:pen-new-square-line-duotone",
            onClick: () => {
              setSelectedNode(nodeProps);
              openNodeDetailModal();
            },
          },
          {
            title: "Delete",
            icon: "solar:trash-bin-trash-line-duotone",
            onClick: () => {
              setSelectedNode(nodeProps);
              openNodeDeleteConfirmModal();
            },
          },
        ]}
      >
        {/* Node Card Connection Dots */}
        <NodeWrapperConnectionDots.TargetDot id={id} />
        {!isMultipleItems && <NodeWrapperConnectionDots.SourceDot id={id} />}

        {/* Node Card Content */}
        {cardContent}

        {/* Node Card Portal Detail Content */}
        {selectedNode?.id === id && (
          <Portal targetElementID={elementID}>{portalDetailContent}</Portal>
        )}
      </CardWithActions>
    );
  },
);

export default NodeWrapper;
