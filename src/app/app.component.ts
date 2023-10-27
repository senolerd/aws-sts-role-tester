import { Component } from '@angular/core';
import { STSClient, STSClientConfig, AssumeRoleCommand, AssumeRoleCommandInput, AssumeRoleCommandOutput } from '@aws-sdk/client-sts'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isStsButtonDisabled: Boolean = true
  isStsSuccess:unknown = null

  stsCredFG = new FormGroup({
    access_key: new FormControl(),
    secret_key: new FormControl(),
    role_arn: new FormControl(),
    region: new FormControl()
  })

  async form_check() {
    let form_control = await Object.values(this.stsCredFG.value).filter(val => {
      return val?.length == 0
    })

    this.isStsButtonDisabled = form_control.length == 0 ? false : true

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
      RoleSessionName: "testingthewater"
    }

    sts_client.send( new AssumeRoleCommand(assume_role_command_input))
      .then(response =>{
        console.log(response)
        this.isStsSuccess = true
      })
      .catch((Err:Error) =>{
        console.log("Err.cause: ", Err.cause)
        console.log("Err.message: ", Err.message)
        console.log("Err.name: ", Err.name)
        this.isStsSuccess = false
      })


  }

  ngOnInit() {
    this.stsCredFG.statusChanges.subscribe(_ => this.form_check())
  }

}
