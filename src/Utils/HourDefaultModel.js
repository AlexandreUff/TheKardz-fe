export default function HourDefaultModel(data) {
    const agora = new Date();
    const diferenca = agora - data;
  
    if (diferenca < 24 * 60 * 60 * 1000) {
      return `hoje às ${formatarHora(data)}`;
    } else if (diferenca < 48 * 60 * 60 * 1000) {
      return `ontem às ${formatarHora(data)}`;
    } else {
      return `${formatarData(data)}, às ${formatarHora(data)}`;
    }
  }
  
  function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  
  function formatarHora(data) {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }