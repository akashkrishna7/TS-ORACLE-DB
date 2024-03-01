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

    // Define an array of customer records to be inserted
    const newCustomers: Customer[] = [
      { CUSTOMER_ID: 7, CUSTOMER_NAME: 'Mickey Mouse', CITY: 'Los Angeles' },
      { CUSTOMER_ID: 8, CUSTOMER_NAME: 'Donald Duck', CITY: 'Orlando' }
      // Add more customer records as needed
    ];

    // Execute INSERT SQL statements for each customer
    for (const customer of newCustomers) {
      await connection.execute(
        `INSERT INTO customers (CUSTOMER_ID, CUSTOMER_NAME, CITY) VALUES (:CUSTOMER_ID, :CUSTOMER_NAME, :CITY)`,
        {
          CUSTOMER_ID: customer.CUSTOMER_ID,
          CUSTOMER_NAME: customer.CUSTOMER_NAME,
          CITY: customer.CITY
        }
      );
      console.log(`Record for ${customer.CUSTOMER_NAME} inserted successfully.`);
    }

    // Execute SELECT query to print table contents
    const result = await connection.execute<Customer>('SELECT * FROM customers');

    // Check if result has rows
    if (result.rows) {
      // Print column names
      console.log('Column Names:', result.metaData?.map(column => column.name));

      // Print all rows
      console.log('Rows:');
      for (const row of result.rows) {
        console.log(row);
      }
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
