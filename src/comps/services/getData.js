

export const getData = () =>{
    const LSdata = JSON.parse(localStorage.getItem("PatientData"));
    console.log("Getting Data ------- ",LSdata);
    return LSdata;
}