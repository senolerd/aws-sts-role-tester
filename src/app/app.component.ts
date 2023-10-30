import { Component } from '@angular/core';
import { STSClient, STSClientConfig, AssumeRoleCommand, AssumeRoleCommandInput, AssumeRoleCommandOutput } from '@aws-sdk/client-sts'
import { FormControl, FormGroup } from '@angular/forms';

export interface IQueryItem  {
  access_key: string,
  secret_key: string,
  role_arn: string,
  region: string,
  success: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  isStsButtonDisabled: Boolean = true
  isFormCleaningButtonDisabled: Boolean = true
  isStsSuccess:unknown = null
  currentValidRoleCredidentials: AssumeRoleCommandOutput|null = null
  errorMessage:string = ""

  historic_list:IQueryItem[] = [
  ] 

  stsCredFG = new FormGroup({
    access_key: new FormControl(),
    secret_key: new FormControl(),
    role_arn: new FormControl(),
    region: new FormControl()
  })

  
  async form_check() {
    // Check form if it is ready to query. If it is accive, enable the query button

    this.currentValidRoleCredidentials = null
    this.isStsSuccess = null
    this.isStsButtonDisabled = true

    let form_control = Object.values(this.stsCredFG.value).filter(val => {
      return val?.length == 0
    })
    this.isStsButtonDisabled = form_control.length == 0 ? false : true
    this.isFormCleaningButtonDisabled = form_control.length > 0 ? true : false

  }

  clean_form(){
    this.stsCredFG.setValue({access_key:"", secret_key:"", role_arn: "", region: ""})
    this.isStsButtonDisabled = true
    this.isFormCleaningButtonDisabled = true
    this.errorMessage = ""
  }


  history_add(query_item:IQueryItem){
    this.historic_list?.push(query_item)
  }
  

  history_remove(item_index:number){
    this.historic_list.splice(item_index,1)
  }

  wayback(item:any){
    this.stsCredFG.setValue({access_key:item.access_key, secret_key:item.secret_key, role_arn:item.role_arn, region:item.region})
  }


  stsAction() {
    this.isStsSuccess = null

    const sts_config:STSClientConfig = {
      region : this.stsCredFG.value.region?.toString(),
      credentials: {
        accessKeyId: this.stsCredFG.value.access_key,
        secretAccessKey: this.stsCredFG.value.secret_key
      }
    }
    
    const sts_client = new STSClient(sts_config)

    const assume_role_command_input:AssumeRoleCommandInput = {
      RoleArn: this.stsCredFG.value.role_arn,
      RoleSessionName: "TestingTheSTS-"+Date.now()
    }

    sts_client.send( new AssumeRoleCommand(assume_role_command_input))
      .then(response =>{
        this.history_add({...this.stsCredFG.getRawValue(), success:true})
        this.currentValidRoleCredidentials = response
        this.isStsSuccess = true
        this.isStsButtonDisabled = true
      })
      .catch((Err:Error) =>{
        this.history_add({...this.stsCredFG.getRawValue(), success:false})
        this.errorMessage = Err.message
        console.log("Err.cause: ", Err.cause)
        console.log("Err.message: ", Err.message)
        console.log("Err.name: ", Err.name)
        this.isStsSuccess = false
      })


  }





  ngOnInit() {
    this.stsCredFG.statusChanges.subscribe(_ => this.form_check())
    this.clean_form()
  }

}
