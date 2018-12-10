import { observable, computed, action, configure } from "mobx";
configure({ enforceActions: 'always' }) //严格模式，必须action来修改state
class UserStore {
    @observable loginStatus = false
    @observable userInfo = {}
    @action changeLoginStatue( status){
        this.loginStatus = status
    }
    @action changeUserInfo(user){
        this.userInfo = Object.assign({}, this.userInfo, user)
    }
}

export default UserStore;