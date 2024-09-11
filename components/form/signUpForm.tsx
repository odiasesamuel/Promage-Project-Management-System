"use client";

import { useState } from "react";
import OrganisationInfoSignUpForm from "./organisationInfoSignUpForm";
import EmployeeInfoSignUpForm from "./employeeInfoSignUpForm";
import MetricInfoSignUpForm from "./metricInfoSignUpForm";

const SignUpForm: React.FC<{}> = () => {
  const [formStep, setFormStep] = useState("organisation_info");
  const changeToOrganisationInfoHandler = () => setFormStep("organisation_info");
  const changeToEmployeeInfoHandler = () => {
    const organisation_information = sessionStorage.getItem("organisation_information");
    if (organisation_information) setFormStep("employee_info");
  };
  const changeToMetricInfoHandler = () => {
    const organisation_information = sessionStorage.getItem("organisation_information");
    const employee_information = sessionStorage.getItem("employee_information");
    if (organisation_information && employee_information) setFormStep("metric_info");
  };

  return (
    <>
      <div className="w-full h-[100px] md:h-[75px] flex items-center justify-between">
        <div className={`${formStep === "organisation_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToOrganisationInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">1</span>
        </div>
        <div className="bg-[#060606] w-[34%] lg:w-[30%] md:w-[34%] xs:w-[30%] 2xs:w-[28%] 3xs:w-[24%] h-[2px]"></div>
        <div className={`${formStep === "employee_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToEmployeeInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">2</span>
        </div>
        <div className="bg-[#060606] w-[34%] lg:w-[30%] md:w-[34%] xs:w-[30%] 2xs:w-[28%] 3xs:w-[24%] h-[2px]"></div>
        <div className={`${formStep === "metric_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToMetricInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">3</span>
        </div>
      </div>

      {formStep === "organisation_info" && <OrganisationInfoSignUpForm changeToEmployeeInfoHandler={changeToEmployeeInfoHandler} />}

    {formStep === "employee_info" && <EmployeeInfoSignUpForm changeToOrganisationInfoHandler={changeToOrganisationInfoHandler} changeToMetricInfoHandler={changeToMetricInfoHandler} />}

      {formStep === "metric_info" && <MetricInfoSignUpForm changeToEmployeeInfoHandler={changeToEmployeeInfoHandler} />}
    </>
  );
};

export default SignUpForm;
