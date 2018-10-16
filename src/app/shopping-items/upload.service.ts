import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
//import { AngularFire2 } from "angularfire2";
import * as firebase from "firebase";
import { Upload } from "./upload";
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class UploadService {
    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    private basePath: string = '/uploads/';
    // private uploadTask: firebase.storage.UploadTask;

    pushUpload(upload) {
        let file = upload;
        let unique = 'pic' + Math.floor(Math.random()*1000000);
        const uploadTask = this.storage.upload(this.basePath + unique, file);
        console.log(this.storage.ref(this.basePath + unique).getDownloadURL());

        // console.log(uploadTask.);


        // let storageRef = firebase.storage().ref();
        // this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        // this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        //     (snapshot) => {
        //         upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100
        //     },
        //     (error) => {
        //         console.log(error);
        //     },
        //     () => {
        //         console.log(this.uploadTask.snapshot.downloadURL);
        //         console.log(firebase.storage().ref(this.basePath).getDownloadURL());
        //         // upload.url = this.uploadTask.snapshot.downloadURL
        //         upload.name = upload.file.name
        //         this.saveFileData(upload)
        //     }
        // )
    }

    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    deleteUpload(upload: Upload) {

    }

    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    private deleteFileStorage(name: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/`).delete();
    }
}