require('@babel/register')({
    plugins: ['transform-class-properties', 'syntax-class-properties']
});
require('./app.js');
