function loginAsUser(){
    $('form').attr('action','/loginuser')
    $('#aluno').attr('class',"on")
    $("#escola").attr('class',"off")
}
function loginAsEscola(){
    $('form').attr('action','/loginEscola')
    $('#aluno').attr('class',"off")
    $("#escola").attr('class',"on")
}