import { getBezierPath } from "reactflow";

export default function CustomBezierEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
}) {
  const offset = data?.offset || 0;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY: sourceY + offset,
    targetX,
    targetY: targetY + offset,
  });

  return (
    <path
      id={id}
      d={edgePath}
      stroke="#555"
      strokeWidth={2}
      fill="none"
      markerEnd={markerEnd}
    />
  );
}
