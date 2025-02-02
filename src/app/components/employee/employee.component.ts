import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
employeeObj : EmployeeObj;
sortBy :string;
searchText :string;
employeeArr : EmployeeObj[]=[];
constructor(){
  this.employeeObj = new  EmployeeObj();
  this.sortBy='';
  this.searchText='';
}
ngOnInit(): void {
  this.getAllEmployee();
}
onSave(){
  this.employeeArr.push(this.employeeObj);
  const isData = localStorage.getItem("EmpData");
  if(isData == null){
   const newArr=[];
   this.employeeObj.EmployeeID=0;
   newArr.push(this.employeeObj);
   localStorage.setItem("EmpData",JSON.stringify(newArr));
  }else{
const oldData=JSON.parse(isData);
const newID= oldData.length +1;
this.employeeObj.EmployeeID=newID;
oldData.push(this.employeeObj);
localStorage.setItem("EmpData",JSON.stringify(oldData));
  }
  this.employeeObj = new  EmployeeObj();
  this.getAllEmployee();
}
getAllEmployee(){
  const isData=localStorage.getItem("EmpData");
  if(isData!=null){
    const localData =JSON.parse(isData);
    this.employeeArr=localData;

  }
}
onEdit(item: EmployeeObj){
this.employeeObj=item;
}
onDelete(item: EmployeeObj){
  const isData=localStorage.getItem("EmpData");
  if(isData!=null){
    const localData =JSON.parse(isData);
   for (let index = 0; index < localData.length; index++) {
    if(localData[index].EmployeeID == item.EmployeeID){
      localData.splice(0,1);
    }
    
   }
   localStorage.setItem("EmpData",JSON.stringify(localData));
   this.getAllEmployee();
  }

}
onSearch(){
  const isData=localStorage.getItem("EmpData");
  if(isData!=null){
    const localData= JSON.parse(isData);
    if(this.sortBy == "Name"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Name.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }
    if(this.sortBy == "Technology"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Technology.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }
    if(this.sortBy == "Designation"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Designation.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }
    if(this.sortBy == "Skill"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Skill.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }
    if(this.sortBy == "Core Expertise"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Core.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }
    if(this.sortBy == "Company"){
      const filteredData=localData.filter((m: EmployeeObj)=>m.Company.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr=filteredData;
    }

}
}
}

export class EmployeeObj{
    EmployeeID: number;
    Name: string;
    Technology: string;
    Designation: string;
    Skill: string;
    Core: string;
    IsCertification: string;
    Certification: string;
    Company: string;
    FewDetails: string;

    constructor() {
      this.EmployeeID=0;
        this.Name = "";
        this.Technology = "";
        this.Designation = "";
        this.Skill = "";
        this.Core = "";
        this.IsCertification = "";
        this.Certification = "";
        this.Company = "";
        this.FewDetails = "";
    }
}

