import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../core/core.module';
import { Web3Service } from '../util/web3.service';
import { MatDialog } from '@angular/material';
import { WalletPopupComponent } from '../wallet-popup/wallet-popup.component';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  accImag = require('../../assets/img/diagrama.svg');
  balance: number;
  stakeList:{ worker: any; staker: string; value: number; period: any; };
  subStakeIndex;
  subStakeList: any[];
  isReStakeLocked: any;

  TokenToWithdraw: number;

  constructor(private web3 :Web3Service,private dialog: MatDialog) {}
  isMetamaskConnected: boolean;
  account: string = "0x0000000000000000000000";


  openDialog(): void {
    const dialogRef = this.dialog.open(WalletPopupComponent, {
  
    });
 
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result,'The dialog was closed');
    
      if(result==1){
 const metamsk=      await  this.web3.connect();
 if(!metamsk){
  // alert that metamsk no installed 
  alert("Web3 locked. Please unlock Metamask ")
 }else{
  this.isMetamaskConnected=true;
  this.account=await this.web3.refreshAccounts();
  console.log(  this.account,'  this.account');
 const amount= await this.web3.getBlance(this.account);
  this.balance=parseFloat (amount.toLocaleString())/10^18;
 }
      }
    });
  }


   // onselectTab(tabNum) {
 //   this.tabNumber=tabNum;
 //   console.log(tabNum,'tab number');
   
 // }
 async fechSmartcontract() {
  console.log('fechSmartcontract');

const stakes=    await this.web3.getStakerInfo(this.account);
this.isReStakeLocked= stakes['reStakeDisabled']
this.stakeList = {
worker:stakes['worker'],
staker:this.account,
value:stakes['value'],//parseFloat (stakes['value'])/10^18,
period:stakes['worker']
}

const lock1=await this.web3.getLockedTokens(this.account,0)
const lock2= await this.web3.getLockedTokens(this.account,1)
this.TokenToWithdraw= stakes['value'] - Math.max(parseFloat(lock1.toString()),  parseFloat(lock2.toString()))
console.log(this.TokenToWithdraw,'TokenToWithdraw');
 
await this.getIndex()
//  await this.getReStakeLockedStatus()
}
  ngOnInit() {}

  async saveStake(value){
const tx= await this.web3.handleStake(value.amount.toLocaleString('fullwide', {useGrouping:false}) ,value.duration);
  }
  async setWorker(value){
const tx= await this.web3.setWorker(value.worker);
  }

  //stakerInfo.workerStartPeriod + minWorkerPeriods
  async detachWorker(){
const tx= await this.web3.setWorker("0x0000000000000000000000000000000000000000");
  }
  async winddown(){
    // staker can enble it by setting it to true or disable by false 
const tx= await this.web3.setWindDown(true);
  }
  async getReStakeLockedStatus(){
this.isReStakeLocked= await this.web3.isReStakeLocked(this.account);
console.log(this.isReStakeLocked,'status');

  }
  async getIndex(){
    this.subStakeList=[];
this.subStakeIndex= await this.web3.getSubStakesLength(this.account);
for (let index = 0; index < this.subStakeIndex; index++) {
const substake= await this.web3.getSubStakeInfo(this.account,index);
this.subStakeList.push(substake)
}
console.log(this.subStakeList,'this.subStakeList');

  }
  async withdraw(value){
const tx= await this.web3.withdraw(value.amount);
  }
  async setReStake(){
const tx= await this.web3.setReStake(!this.isReStakeLocked);
  }

  async prolongStake(value){
const tx= await this.web3.prolongStake(value.index,value.periods);
  }
  async divideStake(value){
const tx= await this.web3.divideStake(value.index,value.amount.toLocaleString('fullwide', {useGrouping:false}) ,value.periods);
  }
}
