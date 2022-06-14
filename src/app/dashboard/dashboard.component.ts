import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acno=""
  pswd=""
  amount=""

  acno1=""
  pswd1=""
  amount1=""

  // form group
  depositForm = this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  withdrawForm = this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  user:any
  lDate:any
  Acno=""



  constructor(private ds:DataService,private db:DataService,private fb:FormBuilder,private router:Router) {
    this.user = this.ds.currentUser
    this.lDate = new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }
  }
  deposit(){
    // alert("Deposit clicked")
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      const result = this.ds.deposit(acno,pswd,amount)
    if(result){
      alert(amount+"deposited successfully and new balance is:"+result)
    }
      
    }
    else{
      alert("Invalid Form")
    }

    



  }

  withdraw(){
    // alert("Withdraw clicked")
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amount=this.withdrawForm.value.amount

    if(this.withdrawForm.valid){
      const result = this.ds.withdraw(acno,pswd,amount)
    if(result){
      alert(amount+"Debited successfully and new balance is:"+result)
    }

    }
    else{
      alert("Invalid Form")
    }


    

  }
  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")

    this.router.navigateByUrl("")

  }
  deleteAccount(){
    this.acno = JSON.parse(localStorage.getItem("currentAcno")||'')


  }
  cancel(){
    this.acno = ""
  }

}
