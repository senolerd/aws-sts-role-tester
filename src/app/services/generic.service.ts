import { Injectable } from '@angular/core';
import { AssumeRoleCommand, AssumeRoleCommandOutput } from '@aws-sdk/client-sts';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor() { }

  credentials$= new ReplaySubject<AssumeRoleCommandOutput>(1)


}
