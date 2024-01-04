import { CloseOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
  haveRemove?: boolean;
  handleClickRemove?: () => void;
  label: string;
}

const COLORS: any = {
  javascript: { displayName: "JavaScript", color: "#f0932b" },
  typescript: { displayName: "TypeScript", color: "#3498db" },
  nodejs: { displayName: "Node.js", color: "#27ae60" },
  csharp: { displayName: "C#", color: "#27ae60" },
};

function Tag({ handleClickRemove, haveRemove, label }: Props) {
  return (
    <div className='flex items-center border text-sm gap-2 px-4 py-1 rounded-full'>
      <span
        style={{
          color: COLORS[label].color,
          fontWeight: "700",
        }}
      >
        {COLORS[label].displayName}
      </span>
      {haveRemove && (
        <button onClick={handleClickRemove} type='button'>
          <CloseOutlined size={16} color='#9e9e9e' />
        </button>
      )}
    </div>
  );
}

export default Tag;
