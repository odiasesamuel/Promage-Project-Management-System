"use client";

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export type ProgressDataType = {
  id: number;
  total_project: number;
  completed_project: number;
  delayed_project: number;
  ongoing_project: number;
};

type OverallProgressType = {
  progress: ProgressDataType[];
};

const OverallProgress: React.FC<OverallProgressType> = ({ progress }) => {
  const { total_project, completed_project, delayed_project, ongoing_project } = progress[0];
  const percentage = Math.round((completed_project / total_project) * 100);
  return (
    <div className="relative">
      <CircularProgressbarWithChildren
        className=""
        value={percentage}
        circleRatio={0.5}
        strokeWidth={4}
        styles={buildStyles({
          rotation: 0.75,
          textColor: "#000000",
          textSize: "20px",
          pathColor: "#1A932E",
          // trailColor: "#eee"
        })}
      >
        <div style={{ position: "absolute", top: "60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontSize: "1.8rem", fontWeight: "500" }}>{percentage}%</p>
          <p style={{ fontSize: "0.73rem", color: "#9A9A9A" }}>Completed</p>
        </div>
      </CircularProgressbarWithChildren>
      <div className="absolute top-[150px] w-full flex items-center justify-between mt-6">
        <div className="h-[100px] w-[23%] text-center">
          <p className="font-semibold text-xl">{total_project}</p>
          <p className="text-[0.73rem] text-[#9A9A9A]">Total projects</p>
        </div>
        <div className="h-[100px] w-[23%] text-center">
          <p className="font-semibold text-xl text-[#1A932E]">{completed_project}</p>
          <p className="text-[0.73rem] text-[#9A9A9A]">Completed</p>
        </div>
        <div className="h-[100px] w-[23%] text-center">
          <p className="font-semibold text-xl text-[#DFA510]">{delayed_project}</p>
          <p className="text-[0.73rem] text-[#9A9A9A]">Delayed</p>
        </div>
        <div className="h-[100px] w-[23%] text-center">
          <p className="font-semibold text-xl text-[#E65F2B]">{ongoing_project}</p>
          <p className="text-[0.73rem] text-[#9A9A9A]">On going</p>
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;
