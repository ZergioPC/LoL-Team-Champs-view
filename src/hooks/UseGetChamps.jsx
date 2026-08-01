import React from "react";

function UseGetChamps (URL){
  const [data, setData] = React.useState(null);
  React.useEffect(()=>{
    if (!URL) return;
    fetch(URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data)=>{
        setData(Object.values(data.data));
      })
      .catch(e=>{
        console.log(e);
      })
  },[URL]);

  return data;
}

export default UseGetChamps;