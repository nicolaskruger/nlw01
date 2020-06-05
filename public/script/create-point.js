//         document
//         .querySelector("select[name=uf]")
//         .addEventListener("change",(event)=>{
//             console.log("mudei")
//         });
// var valor= fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){
//     return res.json()    
// }).then(function (res){
//     console.log(res)
// });
const doc = document
           .querySelector("select[name=uf]");
const docCity = document
                .querySelector("select[name=city]");
const a_ = document
            .querySelector("a[name=loading]");
function populateUFs(){
    var val= fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){
        return res.json()    
    }).then(function (res){
        for (r of res){
            doc.innerHTML += `<option value="${r.id}">${r.nome}</option>`;
        }
           
    });
}
function popThisDoc( url){
    fetch(url)
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        for(r of res){
            docCity.innerHTML +=`<option value="${r.id}">${r.nome}</option>`;
        }
        docCity.disabled = false;
    })
}
populateUFs();
function changLoading(str){
    a_.innerHTML=str
}
var i=1;
var max=100
var b=false;
function printLoading(){
    a_.innerHTML=i.toString()
    i++
    // if(b){
    //     var str=(i*100/max).toString();
    //     a_.innerHTML=str;
    // }else{
    //    a_.innerHTML=""; 
    // }
}
function getCities(event){
    f(event);
}
function f(event){
    // console.log("evento")
    const citiesSelect = document.querySelector("select[name=city]");
    const stateImput = document.querySelector("input[name=state]");
    const num = event.target.selectedIndex;
    stateImput.value = event.target.options[num].text;
    var UF= event.target.value;
    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`;
    // console.log(url)
    citiesSelect.innerHTML =`<option value="">Carregando</option>`;
    var len = citiesSelect.innerHTML.length;
    console.log(len);
    citiesSelect.disabled = true;
    fetch(url)
    .then(res=>res.json())
    .then((res)=>{
        i =1;
        max =res.length;
        // console.log(max);
        changLoading("carregando");
        b=true;
        for(r of res){
            citiesSelect.innerHTML +=`<option value="${r.nome}">${r.nome}</option>`;
            
            //console.log(r);
            //var str=(i*100/max).toString();
            //i++;
            //console.log(str);
            //a_.innerHTML=str
        }
        citiesSelect.innerHTML=citiesSelect.innerHTML.replace(`<option value="">Carregando</option>`,"");
        console.log(citiesSelect.innerHTML)
        a_.innerHTML=""
        b=false;
        citiesSelect.disabled = false;
    })
}
document
        .querySelector("select[name=uf]")
        .addEventListener("change",f);

//setInterval(printLoading,1000);
const itemsToClollect = document.querySelectorAll(".items-grid li");
let collectedItens = document.querySelector("input[name=items]");
let selectedItens= []

function handleSelectedItem(event){
    console.log(event.target);
    var i = parseInt(event.target.dataset.id)-1;
    itemId=event.target.dataset.id
    var name =(itemsToClollect[i].className);
    if(name =="selected"){
        itemsToClollect[i].className=""
        selectedItens.pop(itemId);
    }else{
        selectedItens.push(itemId);
        itemsToClollect[i].className="selected"
    }
    //console.log(selectedItens);
    collectedItens.value= selectedItens;
}

for(item of itemsToClollect){
    item.addEventListener("click",handleSelectedItem);
    if(item.className=="selected"){
        selectedItens.push(item.dataset.id)
    }
}