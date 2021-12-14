export default new class Tables{
    public connection: any;
    init(connection: any){
        this.connection = connection;
        this.createAttendance();
    }

    createAttendance(){
        const sql: string = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.connection.query(sql, (err: Error, success:Response)=>{
            if (err){
                console.log(err);
            } else {
                console.log("Attendance table success created")
            }
        })
    }
}   