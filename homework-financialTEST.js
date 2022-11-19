const financialData = require('./financial.json');
//const financialData=financialDataRaw.forEach((currvalue)=>{if((typeof currvalue.cost)===Number)
//{String(currvalue.cost)}});

console.log('Financial data: ', '\n','Earnings in the year of 2014: ', EarningsInYear(2014), '\n','Earnings per Company: ', EarningsPerCompany(), '\n', 'Spending per Transaction Type:', SpendingPerTransaction());
console.log('ALL VALUES ARE ROUNDED UP TO 2ND DECIMAL PLACE!');

function Datesort(date){//date sorting function, gets us a string for example '2014,03,24' which is a Date format 
  let arr = date.split('-');
  let arrSorted=[];
  for(i=0;i<arr.length; i++){
  arrSorted.push(arr[i])
  }
  arrSorted.reverse()
  arrSorted.toString()
  const result = new Date (arrSorted)
  return result;
 
  }
// 1.1 How much money was spent in 2014
function EarningsInYear(date) {
 // const DateBeginUnix = new Date(BeginDate).getTime();
 // const DateEndUnix = new Date(endDate).getTime();
  // TODO (create functions for calculations below)
  const financialObject=financialData
  //.map((currdate)=>currdate.detailsOfPayent.date=Datesort(currdate.detailsOfPayent.date))
  .filter((currentone)=>{if(Datesort(currentone.detailsOfPayent.date).getFullYear()===date)
 { return currentone;}})

  .map((currentvalue)=> Number(currentvalue.cost))
  .reduce((accumulator,element)=>
    accumulator + element,0);
  
  return financialObject.toFixed(2);
}


// TODO (util functions)
//1.2 Earnings per company
function EarningsPerCompany(){
  const Allcompanies=financialData
  .map((currCompany)=>currCompany.detailsOfPayent.company)
  const CompanyList=Array.from(new Set(Allcompanies));//thats how we get all the companies in one array, so we can sort it
  //we have a number of companies figured out in the code above
  const EarningsSummary=[];//our array that holds earnings for each company
  function CurrentCompanyEarnings(companyName){
    const TotalEarnings = financialData
    .filter((curr)=>curr.detailsOfPayent.company===companyName)//maybe needs an if+return?
    .map((currentvalue)=> +currentvalue.cost)
    .reduce((accu,element)=> accu + element,0);
    
    return (EarningsSummary).push(TotalEarnings.toFixed(2));//function that gets those earnings, depending on the company, its all automated
  }
  for(i=0;i<CompanyList.length;i++){

    CurrentCompanyEarnings(CompanyList[i]);
  }
  const EarningsPresentable = EarningsSummary.map((Counter,index)=>(CompanyList[index] +": "+ Counter)).join(" ");//all the data in a fancy block
  return EarningsPresentable;
}
//1.3  Spendings per transaction type
function SpendingPerTransaction(){

  const AllTransactionTypes=financialData
  .map((currType)=>currType.detailsOfPayent.Type)
  .sort((LowerType,HigherType)=>LowerType-HigherType)
  const TransTypeList=Array.from(new Set(AllTransactionTypes));//we got a list of payment types, sorted in a growing order
  const EarningsTypeSummary=[];//our array that holds earnings for each company
function SpendingTransactions(TransType){
  //a bit similar as above, we look for an index with certain type and sum up all the earnings
const Transaction = financialData.filter((current)=>current.detailsOfPayent.Type===TransType)
.map((currentvalue)=> +currentvalue.cost)
.reduce((accu,element)=> accu + element,0);

return EarningsTypeSummary.push(Transaction.toFixed(2));
}  
for(k=0;k<TransTypeList.length;k++){

  SpendingTransactions(TransTypeList[k]);  
}
const EarnByTypePresentable = EarningsTypeSummary.map((Counter,index)=>('Type ' +TransTypeList[index] +": "+ Counter)).join(" ");//all the data in a fancy block 
  return EarnByTypePresentable;
}
//const tester = financialData.map((everyparam)=> +everyparam.cost)
//.reduce((sum,count)=>{return sum+count;},0);

//console.log(tester);
console.log("a");




