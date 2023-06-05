// This variables are to be used in many functions
let objectToModify;
let index;

//urlParser function to split parameters
const urlParser = (url) => {
  this.index=[]
  const splitted = url.split('/:');
  splitted.forEach((el,index)=>{
    //there might be values that needed to be splitted containing only '/'
    if(el.includes('/')){
      //insert index inside index array to be checked afterwards
      this.index.push(index);
    }
  })
  //remove values that have '/' included
  this.index.forEach((indexNum)=>{
    splitted[indexNum]=splitted[indexNum].substring(0,splitted[indexNum].indexOf('/'))
  })
  const previousFirstElementOfTheArray = splitted.shift();
  this.objectToModify=convertObjectKeys(splitted);
};

//function to store keys in object without values
const convertObjectKeys = (arr) => {
  const object = arr.reduce((accumulator, value) => {
    return { ...accumulator, [value]: '' };
  }, {});
  return object
};

//Store values inside of objects given the instance of the url
const getValuesForUrlObject = (url)=>{
  const arr = url.split('/');
  const previousFirstElementOfTheArray = arr.shift();
  const arrOfElementsToRemove = [];
  //Having the index from before, we can remove constants from the url
  this.index.forEach((index)=>{
    arrOfElementsToRemove.push(arr[index])
  });
  let newArr=[]
  //This way we can get an array of variables only from the url
  arrOfElementsToRemove.forEach((elToRemove,index)=>{
      newArr = arr.filter((el)=>el!==elToRemove);
  })
  //There might be variables that have query params tied
  newArr.forEach(function (el, index) {
    if (el.includes('?')) {
      this[index] = el.substring(0, el.indexOf('?'));
    }
  }, newArr);
  //Add values to object from newArr
  const arrObj=Object.keys(this.objectToModify);
  arrObj.forEach((el,index)=>{
    this.objectToModify[el]=newArr[index];
  })
  //Call the function get query params
  const params=getParamsFromUrl(arr[arr.length-1]);
  //insert the query params to the original object to get the final result
  Object.assign(this.objectToModify,params);
  console.log(this.objectToModify);
}
//regex function to get an object of query params
const getParamsFromUrl = (param)=>{
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = param,
    params = {},
    match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params
}
//Get values from form
let formatValue=document.getElementById('urlForm').addEventListener("submit", (e)=>{
    e.preventDefault();
    let formatUrl = document.getElementById("urlFormat").value;
    let instanceUrl = document.getElementById("urlInstance").value;
    urlParser(formatUrl);
    getValuesForUrlObject(instanceUrl)
    document.getElementById('result-cont').style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
})

let scrollFunct=document.getElementById('scroll').addEventListener("click", (e)=>{
    window.scrollTo(0, document.body.scrollHeight);
})
