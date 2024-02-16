import { updateData } from "../Main";

export const setData = (inputData) =>{
    const LSdata = JSON.parse(localStorage.getItem("PatientData"));
    let Data = localStorage.getItem("PatientData") !== null ? LSdata : [];
    Data.push(inputData);
    localStorage.setItem("PatientData",JSON.stringify(Data));
    console.log("Updated --------");
}