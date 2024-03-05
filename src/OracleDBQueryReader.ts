import { OracleDBConnection } from "./OracleDBConnection";

class OracleDBQueryReader extends OracleDBConnection {
    async getCustomerData() {
        try {
            const connection = await this.getConnection();
            const result = await connection.execute('SELECT * FROM CUSTOMERS');

            if (result.rows) {
                console.log('Column Names:', result.metaData?.map(column => column.name));
                console.log('Rows:');
                console.log(result.rows);
            } else {
                console.log('No data returned from the query.');
            }

            await this.closeConnection(connection);
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }

    async insertValues(){
        const connection = await this.getConnection();
        await connection.execute(`INSERT INTO customers (customer_id, customer_name, city) 
        VALUES (5, 'Johnny Walker', 'Texas')`);

        await connection.commit();

        const result = await connection.execute('SELECT * FROM CUSTOMERS');

            if (result.rows) {
                console.log('Column Names:', result.metaData?.map(column => column.name));
                console.log('Rows:');
                console.log(result.rows);
            } else {
                console.log('No data returned from the query.');
            }

            await this.closeConnection(connection);
    }
}

const oracleDBQueryReader = new OracleDBQueryReader();
oracleDBQueryReader.getCustomerData();