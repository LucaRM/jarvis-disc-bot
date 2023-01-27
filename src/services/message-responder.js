"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponder = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const createUser_1 = require("./api/user/createUser");
const ping_finder_1 = require("./finders/ping-finder/ping-finder");
const temp_request_finder_1 = require("./finders/temp-request-finder/temp-request-finder");
const user_create_finder_1 = require("./finders/user-create-finder/user-create-finder");
let MessageResponder = class MessageResponder {
    constructor(pingFinder, tempRequestFinder, userCreateFinder) {
        this.pingFinder = pingFinder;
        this.tempRequestFinder = tempRequestFinder;
        this.userCreateFinder = userCreateFinder;
    }
    handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = "teste@teste.com";
            let password = "teste01";
            if (this.pingFinder.isPing(message.content)) {
                //If the message is a Ping
                return message.reply("pong!");
            }
            if (this.tempRequestFinder.isTempRequest(message.content)) {
                //If the message is a temperature request
                return message.reply("Correct coding.");
            }
            if (this.userCreateFinder.isUserCreateRequest(message.content)) {
                //If the message is a user creation request
                yield (0, createUser_1.addUser)(email, password);
                return message.reply("User created!.");
            }
            return Promise.reject();
        });
    }
};
MessageResponder = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PingFinder)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TempRequestFinder)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserCreateFinder)),
    __metadata("design:paramtypes", [ping_finder_1.PingFinder,
        temp_request_finder_1.TempRequestFinder,
        user_create_finder_1.UserCreateFinder])
], MessageResponder);
exports.MessageResponder = MessageResponder;
//# sourceMappingURL=message-responder.js.map