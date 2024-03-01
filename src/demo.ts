import oracledb from 'oracledb';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
interface Customer {
    CUSTOMER_ID: number;
    CUSTOMER_NAME: string;
    CITY: string;
  }

async function connectToOracle() {
  try {
    // Establish connection
    const connection = await oracledb.getConnection({
      user: 'SYS',
      password: 'OracleTest1',
      connectString: '0.0.0.0:1521/ORCLCDB',
      privilege: oracledb.SYSDBA
    });

    console.log('Connected to Oracle Database');

    const result = await connection.execute<Customer>('SELECT * FROM EMPLOYEE');

    // Check if result has rows
    if (result.rows) {
      // Print column names
      console.log('Column Names:', result.metaData?.map(column => column.name));

      // Print all rows
      console.log('Rows:');
      console.log(result.rows);
      
    } else {
      console.log('No data returned from the query.');
    }
    // console.log(result);
    
    await connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error connecting to Oracle:', error);
  }
}

connectToOracle();
