function showOptionsRegister(id){
    hidRow = document.getElementById(id);
    hidRow.hidden = !hidRow.hidden;
    console.log("showOptionsRegister at ID:", hidRow.id, " hidden:", hidRow.hidden);
};
