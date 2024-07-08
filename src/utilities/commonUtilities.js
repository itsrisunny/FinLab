export const  currencyFormat = (num, symbol) => {
   return ((symbol)?symbol:"")+num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}