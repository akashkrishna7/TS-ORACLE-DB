import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config(); 

interface Customer {
    CUSTOMER_ID: number;
    CUSTOMER_NAME: string;
    CITY: string;
}

export class OracleDBConnection {
    async getConnection() {
        try {
            const connection = await oracledb.getConnection({
                user: 'SYS',
                password: 'OracleTest1',
                connectString: '0.0.0.0:1521/ORCLCDB',
                privilege: oracledb.SYSDBA
            });
            console.log('Connected to Oracle Database');
            return connection;
        } catch (error) {
            console.error('Error connecting to Oracle:', error);
            throw error;
        }
    }

    async closeConnection(connection: oracledb.Connection) {
        try {
            await connection.close();
            console.log('Connection closed');
        } catch (error) {
            console.error('Error closing connection:', error);
        }
    }
}
