$(document).ready(function () {
    var options = {
      onKeyPress: function (cpf, ev, el, op) {
        var masks = ["000.000.000-000", "00.000.000/0000-00"];
        $(".cpfOuCnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
      },
    };
    $(".cpfOuCnpj").length > 11
      ? $(".cpfOuCnpj").mask("00.000.000/0000-00", options)
      : $(".cpfOuCnpj").mask("000.000.000-00#", options);
    $("#cep").mask("00000-000");
    $("#telefone").mask("(00) 0000-0000");
    $("#celular").mask("(00) 00000-0000");
    $(".money2").mask("#.##0,00", { reverse: true });
  });
 