/**
 * MOST Web Framework "ZeroGravity" Query Module Demo
 *
 * This demonstrates the @themost/query module - a powerful SQL query builder
 * that is part of the MOST Web Framework (Codename ZeroGravity)
 */

const { QueryExpression, QueryField, SqlFormatter } = require('@themost/query');

console.log('='.repeat(60));
console.log('  MOST Web Framework - ZeroGravity Query Module Demo');
console.log('='.repeat(60));
console.log();

// Create a SQL formatter for output
const formatter = new SqlFormatter();

// Demo 1: Simple SELECT query
console.log('1. Simple SELECT Query');
console.log('-'.repeat(40));

const query1 = new QueryExpression()
    .select('id', 'name', 'email', 'createdAt')
    .from('Users');

console.log('Query:', formatter.format(query1));
console.log();

// Demo 2: SELECT with WHERE clause
console.log('2. SELECT with WHERE Clause');
console.log('-'.repeat(40));

const query2 = new QueryExpression()
    .select('id', 'name', 'email')
    .from('Users')
    .where('status').equal('active')
    .and('age').greaterOrEqual(18);

console.log('Query:', formatter.format(query2));
console.log();

// Demo 3: SELECT with JOIN
console.log('3. SELECT with JOIN');
console.log('-'.repeat(40));

const query3 = new QueryExpression()
    .select('Orders.id', 'Orders.total', 'Users.name')
    .from('Orders')
    .join('Users').with(
        new QueryExpression().where('Orders.userId').equal(new QueryField('Users.id'))
    )
    .where('Orders.status').equal('completed');

console.log('Query:', formatter.format(query3));
console.log();

// Demo 4: Aggregation query
console.log('4. Aggregation Query (COUNT, SUM)');
console.log('-'.repeat(40));

const query4 = new QueryExpression()
    .select(
        new QueryField('category'),
        QueryField.count('id').as('totalProducts'),
        QueryField.sum('price').as('totalValue')
    )
    .from('Products')
    .groupBy('category')
    .orderByDescending('totalValue');

console.log('Query:', formatter.format(query4));
console.log();

// Demo 5: Complex query with subquery-like conditions
console.log('5. Complex Query with Multiple Conditions');
console.log('-'.repeat(40));

const query5 = new QueryExpression()
    .select('*')
    .from('Inventory')
    .where('quantity').lowerThan(10)
    .or('lastRestocked').lowerThan(new Date('2025-01-01'))
    .orderBy('quantity');

console.log('Query:', formatter.format(query5));
console.log();

// Demo 6: INSERT query
console.log('6. INSERT Query');
console.log('-'.repeat(40));

const query6 = new QueryExpression()
    .insert({
        name: 'New Product',
        price: 29.99,
        category: 'Electronics',
        createdAt: new Date()
    })
    .into('Products');

console.log('Query:', formatter.format(query6));
console.log();

// Demo 7: UPDATE query
console.log('7. UPDATE Query');
console.log('-'.repeat(40));

const query7 = new QueryExpression()
    .update('Products')
    .set({ price: 24.99, updatedAt: new Date() })
    .where('id').equal(123);

console.log('Query:', formatter.format(query7));
console.log();

// Demo 8: DELETE query
console.log('8. DELETE Query');
console.log('-'.repeat(40));

const query8 = new QueryExpression()
    .delete('TempLogs')
    .where('createdAt').lowerThan(new Date('2025-01-01'));

console.log('Query:', formatter.format(query8));
console.log();

console.log('='.repeat(60));
console.log('  Demo Complete!');
console.log('  Learn more: https://github.com/themost-framework');
console.log('='.repeat(60));
