function is_nickname(asValue) {
    let regExp = /^[A-Za-z0-9+]{3,20}$/;
    if(regExp.test(asValue) && asValue.length >= 3){
        return true;
    }
    return false;
}

function is_password(asValue) {
    if(asValue.length >= 4) {
        return true;
    }
    return false;
}

function pwConfirm(pw1, pw2) {
    if (pw1 == pw2 ) {
        return true;
    }
    return false;
}

function pw_idCheck(nickName, passWd) {
    if (!nickName.includes(passWd)) {
        return true;
    }
    return false;
}




module.exports = { is_password, pwConfirm, is_nickname, pw_idCheck };
