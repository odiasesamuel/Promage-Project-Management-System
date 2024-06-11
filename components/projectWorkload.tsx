import projectWorkload from "@/data/projectWorkload.json";

const ProjectWorkload: React.FC<{}> = () => {
  const data = projectWorkload;
  const maxProjects = data.reduce((max, employee) => (employee.no_of_project > max ? employee.no_of_project : max), -Infinity);

  return (
    <div className="flex justify-between min-h-[230px] flex-wrap gap-y-3">
      {data.map((employee) => {
        const noCircle = employee.no_of_project % 2 === 0 ? Math.floor(employee.no_of_project / 2) - 1 : Math.floor(employee.no_of_project / 2);

        return (
          <div className="w-[13%] flex flex-col items-center justify-end" key={employee.id}>
            <div className={`w-[35px] h-[35px] rounded-full border ${employee.no_of_project=== maxProjects ? "border-[#E65F2B] bg-[#E65F2B]" : "border-[#060606] bg-[#060606]"} flex items-center justify-center`}>
              <span className="text-white text-sm">{employee.no_of_project}</span>
            </div>
            {Array.from({ length: noCircle }).map((_, index) => (
              <div className="w-[35px] h-[35px] rounded-full border border-[#060606]" key={index}></div>
            ))}
            <span className="mt-2 text-xs text-[#9A9A9A]">{employee.employee_name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectWorkload;

{
  /* <div className="w-[35px] h-[35px] rounded-full border border-[#060606]"></div> */
}

{
  /* <div className="w-[35px] h-[35px] rounded-full border border-[#060606] bg-[#060606] flex items-center justify-center">
          <span className="text-white text-sm">06</span>
    </div> */
}

{
  /* <div className="w-[35px] h-[35px] rounded-full border border-[#E65F2B] bg-[#E65F2B] flex items-center justify-center">
          <span className="text-white text-sm">10</span>
    </div> */
}
