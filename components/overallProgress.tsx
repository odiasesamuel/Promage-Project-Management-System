"use client";

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export type ProgressDataType = {
  id: number;
  total_project: number;
  completed_project: number;
  delayed_project: number;
  ongoing_project: number;
};

type OverallProgressType = {
  progressData: ProgressDataType[];
};

const OverallProgress: React.FC<OverallProgressType> = ({ progressData }) => {
  const [progress, setProgress] = useState(progressData);

  useEffect(() => {
    const channel = supabase
      .channel("progress-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "progress" }, (payload) => {
        const newProgress = payload.new as ProgressDataType;

        setProgress((prevProgress) => {
          let updatedProgress;

          updatedProgress = prevProgress.map((progress) => (progress.id === newProgress.id ? newProgress : progress));

          return updatedProgress;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const total_project = progress[0].total_project === null ? 0 : progress[0].total_project;
  const completed_project = progress[0].completed_project === null ? 0 : progress[0].completed_project;
  const delayed_project = progress[0].delayed_project === null ? 0 : progress[0].delayed_project;
  const ongoing_project = progress[0].ongoing_project === null ? 0 : progress[0].ongoing_project;
  const percentage = total_project === 0 ? 0 : Math.round((completed_project / total_project) * 100);
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
      <div className="absolute top-[150px] 2xs:top-[130px] xs:top-[180px] sm:top-[200px] lg:top-[250px] xl:top-[200px] 3xl:top-[200px] w-full flex items-center justify-between mt-6">
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
