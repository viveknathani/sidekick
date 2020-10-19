function checkEmail(email)
{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = regex.test(email);
    return result;
}

function checkPassword(password)
{
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const result = regex.test(password);
    return result;
}

function validateUser(email, password)
{
    const emailRes = checkEmail(email);
    const passwordRes = checkPassword(password);
    const result = { emailRes : 'OK', passwordRes : 'OK' };
    if(!emailRes) result.emailRes = 'Incorrect email format.';
    if(!passwordRes) result.passwordRes = 'Password format : Minimum eight characters, at least one letter and one number';
    return result;
}

module.exports = {
    validateUser : validateUser
}