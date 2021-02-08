



exports.createUserObj = (obj)=> {
	const schema = {tableName: "s_user",
	columnName: `
	FIRST_NAME,
	LAST_NAME,
	EMAIL_NOTIFIED,
	USER_NAME,
	ID_S_USER_CREATE,
	ID_S_USER_MOD,
	STORNO,
	ID_S_USER_VALID,
	CREATE_DATE,
	MOD_DATE,
	STORNO_DATE,
	VALID,
	MOBILE_PHONE,
	BANNED,
	ID_INTL_LANGUAGE,
	BANNED_COMM,
	USER_PASSWORD,
	WRONG_PASSW,
	USER_COMMENT,
	GDPR_TORLES`,
  data: `
  '${obj.firstName}',
  '${obj.lastName}',
  '${obj.email}',
  '${obj.userName}',
  ${obj.idSUserCreate},
  ${obj.idSUserMode},
  ${obj.storno},
  ${obj.idSUserValid},
  '${obj.createDate}',
  'null',
  null,
  ${obj.valid},
  '${obj.mobilePhone}',
  null,
  ${obj.idIntlLanguage},
  null,
  '${obj.passWd}',
  null,
  null,
  'null'`}
	return schema
}



// FIRST_NAME, *
// LAST_NAME, *
// EMAIL_NOTIFIED,*
// USER_NAME,*
// ID_S_USER_CREATE,**
// ID_S_USER_MOD,**
// STORNO, **
// ID_S_USER_VALID,**
// CREATE_DATE,**
// MOD_DATE,--++
// STORNO_DATE,--++
// VALID,**
// MOBILE_PHONE,**
// BANNED,--++
// ID_INTL_LANGUAGE,**
// BANNED_COMM,--++
// USER_PASSWORD,**
// WRONG_PASSW,--++
// USER_COMMENT,--++
// GDPR_TORLES--++