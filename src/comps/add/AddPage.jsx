import {useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { setData } from '../services/setData';

const AddPage = (props) =>{

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [fmname, setFmName] = useState('');
    const [street, setStreet] = useState('');
    const [village, setVillage] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState(props.date);

    const constructInputObject = () => {
        // consolidating input values
        return {
          date: date,
          name,
          age,
          gender,
          fmname,
          street,
          village,
          phone
        };
      };

    const handleInput = (e) => {
        // Handle input changes for each field
        switch (e.target.name) {
          case 'name':
            setName(e.target.value);
            break;
          case 'age':
            setAge(e.target.value);
            break;
          case 'gender':
            setGender(e.target.id);
            break;
          case 'fmname':
            setFmName(e.target.value);
            break;
          case 'street':
            setStreet(e.target.value);
            break;
          case 'village':
            setVillage(e.target.value);
            break;
          case 'phone':
            setPhone(e.target.value);
            break;
          default:
            break;
        }
      };
    

    // Function to reset all input fields
    const resetForm = () => {
        setName('');
        setAge('');
        setGender('');
        setFmName('');
        setStreet('');
        setVillage('');
        setPhone('');
    };

    
     useEffect(() => {
         setDate(props.date);
     }, [props.date]);


    const notRequired = ["street","phone","fmname"]
    const required = [];

    const handleSubmit = (e) =>{
        e.preventDefault();
        const input = constructInputObject();
        //console.log("Constructed Data -- ",input);
        //Validation
        for(const key in input){ 
            if(!(notRequired.includes(key))){ //is the key is an Required Fields
                if(input[key] === null || input[key] === ''){ 
                    if(!(required.includes(key))){  //if not in Required Fields
                        required.push(key);
                    }
                }
            } 
        }
        if(required[0] != null){ //Checking Required Fields
            let txt = '';
            required.forEach( e => txt+= " " +e.toUpperCase());
            Swal.fire({
                icon: "error",
                title: "Fill All These ...",
                text: txt
            });
        }else{
            //Saving Data ...
            const LSdata = JSON.parse(localStorage.getItem("PatientData"));
            let Data = localStorage.getItem("PatientData") !== null ? LSdata : [];
            Data.push(input);
            localStorage.setItem("PatientData",JSON.stringify(Data));
            props.updateParentData(Data)       // updating to parent comp
            resetForm();
            Swal.fire({
                title: "Patient Added !",
                text: `Name - ${input.name}`,
                icon: "success"
              });
        }
    }

    return(
        <div className='mainContainer' > 
            <div className="formContainer">
                <form onSubmit={handleSubmit} >
                    <div className="input-field">
                        <label>Name</label>
                        <input name='name' value={name} onChange={handleInput} type="text"></input>
                    </div>
                    <div className="input-field">
                        <label>Age</label>
                        <input name='age' value={age} onChange={handleInput} type="number"></input>
                    </div>
                    <div className="input-field df-row">
                        <label>Gender</label>
                        <div>
                            <input name='gender'id='male' onChange={handleInput} checked={gender === 'male'} type="radio"></input>
                            <label>Male</label>
                            <input name='gender' id='female' onChange={handleInput} checked={gender === 'female'} type="radio"></input>
                            <label>Female</label>
                        </div>
                    </div>
                    <div className="input-field">
                            <label>{ gender === 'female' ? "D/o" : "S/o"}</label>
                            <input name='fmname' value={fmname} onChange={handleInput} type="text"></input>
                        </div>
                        <div className="input-field">
                            <label>Street</label>
                            <input name='street' value={street} onChange={handleInput} type="text"></input>
                        </div>
                        <div className="input-field">
                            <label>Village</label>
                            <input name='village' value={village} onChange={handleInput} type="text"></input>
                        </div>
                        <div className="input-field">
                            <label>Phone No</label>
                            <input name='phone' value={phone} onChange={handleInput} type="number"></input>
                        </div>
                </form>
            </div> 
            <div>
              <button onClick={handleSubmit}>Add Person</button>
            </div>                     
        </div>
    )
}

export default AddPage;