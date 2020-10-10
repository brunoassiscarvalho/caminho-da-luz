export default class Utils {
    static isValidCPF(cpf) {
        console.log("cpf", cpf)
        if (typeof cpf !== "string") return false
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
            console.log("erro 1",cpf )
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) {
            console.log("erro 2", cpf)
            return false
        }
        soma = 0
        for (var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) {
            console.log("erro 3")
            return false
        }
        return true
    }

}
