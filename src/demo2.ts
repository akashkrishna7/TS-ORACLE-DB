import oracledb from 'oracledb';

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

    // Execute INSERT SQL statement
    const newCustomer: Customer = {
      CUSTOMER_ID: 6,
      CUSTOMER_NAME: 'Johnny Bravo',
      CITY: 'Washington'
    };

    await connection.execute(
      `INSERT INTO customers (CUSTOMER_ID, CUSTOMER_NAME, CITY) VALUES (:CUSTOMER_ID, :CUSTOMER_NAME, :CITY)`,
      {
        CUSTOMER_ID: newCustomer.CUSTOMER_ID,
        CUSTOMER_NAME: newCustomer.CUSTOMER_NAME,
        CITY: newCustomer.CITY
      }
    );

    console.log('Record for Johnny Bravo inserted successfully.');

    // Execute SELECT query to print table contents
    const result = await connection.execute<Customer>('SELECT * FROM customers');

    // Check if result has rows
    if (result.rows) {
      // Print column names
      console.log('Column Names:', result.metaData?.map(column => column.name));

      // Print all rows
      console.log('Rows:');
      console.log(result.rows.map(row => row.CUSTOMER_NAME));
      
    } else {
      console.log('No data returned from the query.');
    }

    // Close the connection
    await connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error connecting to Oracle or executing query:', error);
  }
}

connectToOracle();
