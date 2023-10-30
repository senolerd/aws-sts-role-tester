import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LambdaClient, LambdaClientConfig, InvokeCommand } from "@aws-sdk/client-lambda"
import { AssumeRoleCommandOutput } from '@aws-sdk/client-sts';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-lambda-test',
  templateUrl: './lambda-test.component.html',
  styleUrls: ['./lambda-test.component.css']
})
export class LambdaTestComponent {

  constructor(
    private _credentialsSVC:GenericService
  ){}

  fnName = new FormControl()
  fnReturn:any 
  config:LambdaClientConfig = {
    region: "us-east-1"
  }
  
 lambdaTest(){
  const _client = new LambdaClient(this.config)

  _client.send(new InvokeCommand({FunctionName: this.fnName.value}))
    .then (res =>{
      console.log(res)
      this.fnReturn = JSON.parse(new TextDecoder().decode(res.Payload))
    })
    .catch((error:Error) =>{
      this.fnReturn = error.message
      console.log("Error: ", error.message)
    })
 }

  checkConfig(){
    console.log(this.config)
  }
  
  ngOnInit(){
    this._credentialsSVC.credentials$.subscribe(res =>{
      this.config.credentials = {
        accessKeyId: String(res.Credentials?.AccessKeyId),
        secretAccessKey: String(res.Credentials?.SecretAccessKey),
        sessionToken: res.Credentials?.SessionToken,
        expiration: res.Credentials?.Expiration
      }
    })
  }


}
