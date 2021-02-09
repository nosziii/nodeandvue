const tableSchemaGenerated = (tableSchema) => {
	if (typeof tableSchema === "string") {
		return tableSchema
	} else if (typeof tableSchema === "object") {
		let tableName =''
		let column = []
		let columnSize = []
		for (let i in tableSchema) {
		 if (i.includes('tableName')){
		 	tableName = tableSchema[i]
		 }
		 else if(i.includes('column')) {
		 	column.push(tableSchema[i])
		 }
		 else if(i.includes('Size')){
		 	columnSize.push(tableSchema[i]) 
		 }
		}
	}
}

const insertTableSchemaGenerated = (schema)=>{
	if(schema && schema.tableName){
		return `INSERT INTO ${schema.tableName} (${schema.columnName}) values (${schema.data})`
	}
	
	
}

exports.createDb = async function (con, name) {
	con.connect(function (err) {
		if (err) throw err
		console.log("Connected!")
		con.query(`CREATE DATABASE ${name}`, function (err, result) {
			if (err) throw err
			console.log("Database created")
		})
	})
}

exports.createTable = async function (con, tablelSchema) {
	con.connect(function (err) {
		if (err) throw err
		const generatedSchema = tableSchemaGenerated(tablelSchema)
		console.log("Connected!")
		const sql = generatedSchema
		con.query(sql, function (err, result) {
			if (err) throw err
			console.log("Table created")
		})
	})
}
exports.insertRecord = async function (con, tablelSchema) {
	con.connect(function(err) {
		if (err) throw err
		console.log("Connected!")
		const sqlString = insertTableSchemaGenerated(tablelSchema)
		const sql = `${sqlString}`
		con.query(sql, function (err, result) {
			if (err) throw err
			console.log("1 record inserted")
		})
	})
}

exports.selectRecord = (con, selectStr)=> {
	con.connect(function(err) {
		if (err) throw err
		con.query(selectStr, function (err, result, fields) {
			if (err) throw err
			console.log(result)
		})
	})
}