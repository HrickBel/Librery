function registerAsUser(){
    $('form').attr('action','/registeruser')
    $('#aluno').attr('class',"on")
    $("#escola").attr('class',"off")
}
function registerAsEscola(){
    $('form').attr('action','/registerescola')
    $('#aluno').attr('class',"off")
    $("#escola").attr('class',"on")
}