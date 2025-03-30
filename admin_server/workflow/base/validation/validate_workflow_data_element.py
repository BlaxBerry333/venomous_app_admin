from rest_framework import serializers

__all__ = [
    "SupportedNodeType",
    "validate_structure_of_element",
    "validate_structure_of_node",
    "validate_message_node",
    "validate_fetch_node",
    "validate_script_node",
]


class SupportedNodeType:
    """
    可支持的 node.type 种类
    """

    Message = "message"
    Fetch = "fetch"
    Script = "script"


def validate_structure_of_element(element, max_amount_of_nodes):
    """
    验证 element 的数据结构
    """
    if not isinstance(element, dict):
        raise serializers.ValidationError("element must be a dict object")
    for key in ["nodes", "edges"]:
        if key not in element:
            raise serializers.ValidationError(f"element must contain {key} property")
        if not isinstance(element[key], list):
            raise serializers.ValidationError(f"{key} must be a list array")
    if len(element["nodes"]) >= max_amount_of_nodes:
        raise serializers.ValidationError(
            f"Number of nodes cannot exceed {max_amount_of_nodes}"
        )


def validate_structure_of_node(node):
    """
    验证 node 的数据结构
    """
    if not isinstance(node, dict):
        raise serializers.ValidationError("node must be a dict object")
    if "type" not in node:
        raise serializers.ValidationError("node must contain type property")
    if "data" not in node:
        raise serializers.ValidationError("node must contain data property")
    if not isinstance(node["data"], dict):
        raise serializers.ValidationError("data property of node must be a dict object")
    supported_node_type = vars(SupportedNodeType).values()
    if node["type"] not in supported_node_type:
        raise serializers.ValidationError(
            f"node type must be one of {', '.join(supported_node_type)}"
        )


def validate_message_node(node_data):
    """
    验证 Message Node
    """
    if "message" not in node_data:
        raise serializers.ValidationError(
            "data property of Message Node must contain message property"
        )


def validate_fetch_node(node_data):
    """
    验证 Fetch Node
    """
    if "items" not in node_data:
        raise serializers.ValidationError(
            "data property of Fetch Node must contain items property"
        )

    node_data_items = node_data["items"]
    if not isinstance(node_data_items, list):
        raise serializers.ValidationError(
            "items property of Fetch Node must be a list array"
        )
    if not node_data_items:
        raise serializers.ValidationError(
            "items property of Fetch Node cannot be a empty list array"
        )


def validate_script_node(node_data):
    """
    验证 Script Node
    """
    if "code" not in node_data:
        raise serializers.ValidationError(
            "data property of Script Node must contain code property"
        )
