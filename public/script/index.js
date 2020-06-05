const mod = document
            .querySelector("div[id=modal]");
const seachD = document
                .querySelector("a[name=pesquisa]");
const clode = document
                .querySelector("#modal .header a");
function openTela(event){
    mod.className=""
}
seachD.addEventListener("click",openTela)
clode.addEventListener("click",()=>{
    mod.className="hide";
})