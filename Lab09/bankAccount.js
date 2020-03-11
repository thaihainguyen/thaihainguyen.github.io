var accountInfo = (function(){
 return{
  Account:function(name, balance){
   this.accName = name;
   this.accBalance = balance;
  }
 }
}
)();

var accountInfoList = [];
	
var account = (function(){		
 function listAccount(){
  let count = accountInfoList.length;
  let listAcc = "";
  for(let i=0; i<count; i++){
   listAcc += "Account name: " + accountInfoList[i].accName + " - Balance: " +  accountInfoList[i].accBalance + "\n";
  }
  document.getElementById("accList").value = listAcc;
 }
 return{
  createAccount:function(){
   let name = document.getElementById("accName").value;
   let balance = document.getElementById("deposit").value;
   let newAcc = new accountInfo.Account(name, balance);
   accountInfoList.push(newAcc);
   listAccount();
  }
 }
}
)();
