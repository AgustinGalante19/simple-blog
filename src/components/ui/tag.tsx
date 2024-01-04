import { TAGS } from "@/lib/TAGS";
import { IconX } from "@tabler/icons-react";
import React from "react";

interface Props {
  haveRemove?: boolean;
  handleClickRemove?: () => void;
  label: string;
}

function Tag({ handleClickRemove, haveRemove, label }: Props) {
  return (
    <div className='flex items-center border text-sm gap-2 px-4 py-1 rounded-full'>
      <span
        style={{
          color: TAGS.find((e) => e.key === label)?.color ?? "#000",
          fontWeight: "700",
        }}
      >
        {TAGS.find((e) => e.key === label)?.displayTitle}
      </span>
      {haveRemove && (
        <button onClick={handleClickRemove} type='button'>
          <IconX size={16} color='#9e9e9e' />
        </button>
      )}
    </div>
  );
}

export default Tag;
