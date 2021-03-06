export default class Utils {
  static isValidCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false
    }
    soma = 0
    for (var j = 1; j <= 10; j++)
      soma = soma + parseInt(cpf.substring(j - 1, j)) * (12 - j)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false
    }
    return true
  }

}
