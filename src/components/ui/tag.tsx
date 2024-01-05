import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

interface Props {
  haveRemove?: boolean;
  handleClickRemove?: () => void;
  label: string;
}

const COLORS: any = {
  javascript: { displayName: "JavaScript", color: "#323330", icon: "/js.svg" },
  typescript: { displayName: "TypeScript", color: "#3498db", icon: "/ts.svg" },
  nodejs: { displayName: "Node.js", color: "#27ae60", icon: "/nodejs.svg" },
  csharp: { displayName: "C#", color: "#7F3A86", icon: "/csharp.svg" },
};

function Tag({ handleClickRemove, haveRemove, label }: Props) {
  return (
    <div className='flex items-center border text-sm gap-2 px-4 py-1 rounded-md bg-slate-50/90'>
      <Image
        src={COLORS[label].icon}
        alt={`${COLORS[label].displayName}`}
        width={20}
        height={20}
      />
      <span
        style={{
          color: COLORS[label].color,
          fontWeight: "700",
        }}
      >
        {COLORS[label].displayName}
      </span>
      {haveRemove && (
        <button onClick={handleClickRemove} type='button' className='flex'>
          <CloseOutlined size={16} color='#9e9e9e' />
        </button>
      )}
    </div>
  );
}

export default Tag;
