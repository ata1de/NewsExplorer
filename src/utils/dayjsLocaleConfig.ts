import dayjs from "dayjs";
import "dayjs/locale/pt-br";
var localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

// Para traduzir os nomes de dias e mês para pt-br.
dayjs.locale("pt-br")