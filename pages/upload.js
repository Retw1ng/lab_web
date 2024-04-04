import Head from "next/head";
import React from "react";

const UploadPage = () => {
  
  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);
  const [animals,setAnimals] = React.useState([]);
  
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };
  
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  
  function handle(animals){
    console.log(animals)
    //animals=Object.keys(animals);
    if (animals.length===0) {
      alert('err');
    }
    setAnimals(animals);
  }
  
  React.useEffect(()=>{
    fetch('api/getAnimals').then(data=>data.json()).then(data=>handle(data))
  },[]);
  
  
  function Animal(props){
    return (
      <option>{props.name}</option>
    );
  }
  
  return(
    <>
      <Head>
        <title>Upload Animal</title>
      </Head>
      <h2>Upload file</h2>
      <p>Выберите тип изображения </p>
      <select>
        {animals.map((animal,i)=><Animal name={animal} />)}
      </select>
        <input type="file" name="myImage" onChange={uploadToClient} /> <br />
        <button onClick={uploadToServer}>Send</button>
    </>
  );
};

export default UploadPage;
