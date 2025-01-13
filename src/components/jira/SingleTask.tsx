import React from "react";
import { Task } from "../../interfaces/task.interface";
import { IoReorderTwoOutline } from "react-icons/io5";
import { useShallow } from "zustand/shallow";
import { useTaskStore } from "../../stores/tasks/task.store";
interface Props {
  task: Task;
}
export default function SingleTask({ task }: Readonly<Props>) {
  const { setDraggingTaskId, removeDraggingTaskId } = useTaskStore(
    useShallow((state) => ({
      setDraggingTaskId: state.setDraggingTaskId,
      removeDraggingTaskId: state.removeDraggingTaskId,
    }))
  );
  return (
    <div
      draggable={true}
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
}
