import { threadId } from "worker_threads";

export class Log {
    private _prevHash : string;
    private _message : string;
    private _nonce : number;

    constructor(prevHash : string, message : string, nonce : number) {
        this._prevHash = prevHash;
        this._message = message;
        this._nonce = nonce;
    }

    get prevHash(): string {
        return this._prevHash;
    }

    set prevHash(value: string) {
        this._prevHash = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get nonce(): number {
        return this._nonce;
    }

    set nonce(value: number) {
        this._nonce = Number.isInteger(value)? value : this._nonce;
    }

    public toString() {
        return this._prevHash.toString()  + ',' + this.message.toString() + ',' + this.nonce.toString(); 
    }
}