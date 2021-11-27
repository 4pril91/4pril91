const { 
    is_password,
    pwConfirm,
    is_nickname,
    pw_idCheck } = require('./idcheck.js');
  
  test('입력한 아이디는 영어대소문자,숫자만으로 3글자 이상 사용가능하다.(특수문자 및 한글 사용불가능)', () => {
    expect(is_nickname('123')).toEqual(true);
    expect(is_nickname('Ao1')).toEqual(true);
    expect(is_nickname('12')).toEqual(false);
    expect(is_nickname('Ao1@#$')).toEqual(false);
    expect(is_nickname('아니')).toEqual(false);
    expect(is_nickname('어려우어')).toEqual(false);
  });
  
  test('pw 과 pw2 는 동일한 값이다', () => {
    expect(pwConfirm('Ao@1', 'Ao@1')).toEqual(true);
    expect(pwConfirm('Aoli141', 'Ao1i414')).toEqual(false);
    expect(pwConfirm('12345678', 'myPassword')).toEqual(false);
  });
  
  test('비밀번호는 4글자 이상이다.', () => {
    expect(is_password('12345')).toEqual(true);
    expect(is_password('')).toEqual(false);
    expect(is_password('1')).toEqual(false);
    expect(is_password('12')).toEqual(false);
    expect(is_password('123')).toEqual(false);
  });
  
  test('비밀번호가 아이디에 포함되지 않는다.', () => {
    expect(pw_idCheck('Ao1', '1515123')).toEqual(true);
    expect(pw_idCheck('qwrqweerqw12', 'akakakk12')).toEqual(true);
    expect(pw_idCheck('aaaaaa', 'bbbbbb')).toEqual(true);
    expect(pw_idCheck('12345678', '1234')).toEqual(false);
    expect(pw_idCheck('1212123', '1212')).toEqual(false);
  });
  
  
  
  
  